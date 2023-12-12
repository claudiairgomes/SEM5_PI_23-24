import {Inject, Service} from "typedi";
import IBuildingService from "./IServices/IBuildingService";
import {IBuildingDTO} from "../dto/IBuildingDTO";
import {Result} from "../core/logic/Result";
import config from "../../config";


import IBuildingRepo from "./IRepos/IBuildingRepo";
import {Building} from "../domain/building";
import {BuildingMap} from "../mappers/BuildingMap";
import BuildingRepo from "../repos/buildingRepo";
import {sortedUniq} from "lodash";
import IFloorRepo from "./IRepos/IFloorRepo";

@Service()
export default class BuildingService implements IBuildingService{

  constructor(
    @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo

  ) {}

  public async getBuildingById(buildingId: string): Promise<Result<IBuildingDTO>> {

   // try{
    console.log("Building of id:")
    const building = await this.buildingRepo.findByDomainId(buildingId); 

    console.log("Building of id:")
    console.log(building);

    const buildingDTOResult = BuildingMap.toDTO( building ) as IBuildingDTO;
        return Result.ok<IBuildingDTO>( buildingDTOResult )
  
        console.log(buildingDTOResult);
  /*} catch (error) {
      // Handle any errors, log them, and return a Result indicating failure
      console.error('Error while fetching building:', error);
      return Result.fail('Failed to get building');
    }*/
  }



  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {

      const buildingOrError = await Building.create( buildingDTO );

      if (buildingOrError.isFailure) {
        return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
      }

      const buildingResult = buildingOrError.getValue();

      await this.buildingRepo.save(buildingResult);

      const buildingDTOResult = BuildingMap.toDTO( buildingResult ) as IBuildingDTO;
      return Result.ok<IBuildingDTO>( buildingDTOResult )
    } catch (e) {
      throw e;
    }
  }


  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {


    try {
      const building = await this.buildingRepo.findByDomainId(buildingDTO.id);
      // const floor = await this.floorRepo.findByDomainId(floorDTO.id);

      if (building === null) {
        return Result.fail<IBuildingDTO>("Building not found");
      }
      else {
        // Check which fields are present in the request and update them 
        if(buildingDTO.name!== undefined){
          building.props.name = buildingDTO.name;
        }
        if (buildingDTO.description!==undefined){
          building.props.description  = buildingDTO.description;


        }
        if (buildingDTO.dimension!==undefined){
          building.props.dimension = buildingDTO.dimension;
        }
        if (buildingDTO.code!==undefined){
          building.props.code = buildingDTO.code;
        }
        await this.buildingRepo.save(building);

        const buildingDTOResult = BuildingMap.toDTO( building ) as IBuildingDTO;
        return Result.ok<IBuildingDTO>( buildingDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }


  public async getAllBuildings() :Promise<Result<IBuildingDTO[]>>{
    try {
      // Implement the logic to retrieve a list of all buildings from your data source
      // For example, if you have a BuildingRepository, you can call a method like getAllBuildings from there

      const buildings = await this.buildingRepo.findAll();

      // Return the list of building DTOs
      return buildings;
    } catch (error) {
      // Handle any errors, log them, and return a Result indicating failure
      console.error('Error while fetching buildings:', error);
      return Result.fail('Failed to fetch buildings');
    }
  }




  public async getBuildingsByFloorRange(min: number, max: number): Promise<Result<IBuildingDTO[]>>{
    try {
      const buildingResult = await this.buildingRepo.findAll();

      const buildings=[];

      if(buildingResult.length != 0){
        buildingResult.forEach(async (element) => {
          const buildingDTO = BuildingMap.toDTO(element);
          if(await this.floorRepo.floorInLimit(buildingDTO.id,min,max)){
            buildings.push(buildingDTO);
          }
        })
      }
      return Result.ok<IBuildingDTO[]>( buildings );
    } catch (e) {
      throw e;
    }
  }


  
}
