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

@Service()
export default class BuildingService implements IBuildingService{

  constructor(
    @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
  ) {}

  public async getBuilding( buildingId: string): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByDomainId(buildingId);

      if (building === null) {
        return Result.fail<IBuildingDTO>("Building not found");
      }
      else {
        const roleDTOResult = BuildingMap.toDTO( building ) as IBuildingDTO;
        return Result.ok<IBuildingDTO>( roleDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }


  async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
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

  async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {

    try {
      const building = await this.buildingRepo.findByDomainId(buildingDTO.id);


      if (building === null) {
        return Result.fail<IBuildingDTO>("Building not found");
      }
      else {
        building.props.name = buildingDTO.name;
        building.props.description = buildingDTO.description;
        building.props.dimension = buildingDTO.dimension;
        building.props.code = buildingDTO.code;
        await this.buildingRepo.save(building);

        const buildingDTOResult = BuildingMap.toDTO( building ) as IBuildingDTO;
        return Result.ok<IBuildingDTO>( buildingDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }


  public async getAllBuildings() {
    try {
      // Implement the logic to retrieve a list of all buildings from your data source
      // For example, if you have a BuildingRepository, you can call a method like getAllBuildings from there

      const buildings = await this.buildingRepo.findAll();

      // Return the list of building DTOs
      return Result.ok<IBuildingDTO[]>(buildings);
    } catch (error) {
      // Handle any errors, log them, and return a Result indicating failure
      console.error('Error while fetching buildings:', error);
      return Result.fail('Failed to fetch buildings');
    }
  }
}
