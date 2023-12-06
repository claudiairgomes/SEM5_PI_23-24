import {Inject, Service} from "typedi";
import IFloorService from "./IServices/IFloorService";
import {IFloorDTO} from "../dto/IFloorDTO";
import {Result} from "../core/logic/Result";
import config from "../../config";


import IFloorRepo from "./IRepos/IFloorRepo";
import {Floor} from "../domain/floor";
import {FloorMap} from "../mappers/FloorMap";

@Service()
export default class FloorService implements IFloorService{

  constructor(
    @Inject(config.repos.floor.name) private floorRepo : IFloorRepo
  ) {}

  public async getFloor( floorId: string): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByDomainId(floorId);

      if (floor === null) {
        return Result.fail<IFloorDTO>("Floor not found");
      }
      else {
        const roleDTOResult = FloorMap.toDTO( floor ) as IFloorDTO;
        return Result.ok<IFloorDTO>( roleDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }

  public async findAll() {
    try {
      // Implement the logic to retrieve a list of all floors from your data source

      const floorList = await this.floorRepo.findAll();

      // Return the list of building DTOs
      return Result.ok<IFloorDTO[]>(floorList);
    } catch (error) {
      // Handle any errors, log them, and return a Result indicating failure
      console.error('Error while fetching buildings:', error);
      return Result.fail('Failed to fetch buildings');
    }
  }

  


  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {

      const floorOrError = await Floor.create( floorDTO );

      if (floorOrError.isFailure) {
        return Result.fail<IFloorDTO>(floorOrError.errorValue());
      }

      const floorResult = floorOrError.getValue();

      await this.floorRepo.save(floorResult);

      const floorDTOResult = FloorMap.toDTO( floorResult ) as IFloorDTO;
      return Result.ok<IFloorDTO>( floorDTOResult )
    } catch (e) {
      throw e;
    }
  }

/*  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {

      const floor = await this.floorRepo.findByDomainId(floorDTO.id);


      if (floor === null) {
        return Result.fail<IFloorDTO>("Floor not found");
      }
      else {
        floor.props.buildingId = floorDTO.buildingId;
        floor.props.floorNumber = floorDTO.floorNumber;
        floor.props.description = floorDTO.description;
        await this.floorRepo.save(floor);

        const floorDTOResult = FloorMap.toDTO( floor ) as IFloorDTO;
        return Result.ok<IFloorDTO>( floorDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }

 */



  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByDomainId(floorDTO.id);


      if (!floor) {
        return Result.fail<IFloorDTO>("Floor not found");
      } else {
        // Check which fields are present in the request and update them
        if (floorDTO.buildingId !== undefined) {
          floor.props.buildingId = floorDTO.buildingId;
        }
        if (floorDTO.floorNumber !== undefined) {
          floor.props.floorNumber = floorDTO.floorNumber;
        }
        if (floorDTO.description !== undefined) {
          floor.props.description = floorDTO.description;
        }

        await this.floorRepo.save(floor);

        const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
        return Result.ok<IFloorDTO>(floorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllFloors() {
    try {
      // Implement the logic to retrieve a list of all buildings from your data source
      // For example, if you have a BuildingRepository, you can call a method like getAllBuildings from there

      const floors = await this.floorRepo.findAll();

      // Return the list of building DTOs
      return Result.ok<IFloorDTO[]>(floors);
    } catch (error) {
      // Handle any errors, log them, and return a Result indicating failure
      console.error('Error while fetching floors:', error);
      return Result.fail('Failed to fetch floors');
    }
  }


}
