
import {Inject, Service} from "typedi";
import IElevatorService from "./IServices/IElevatorService";
import {IElevatorDTO} from "../dto/IElevatorDTO";
import {Result} from "../core/logic/Result";
import config from "../../config";

import {Building} from "../domain/building";
import IElevatorRepo from "./IRepos/IElevatorRepo";
import {ElevatorMap} from "../mappers/ElevatorMap";
import {Elevator} from "../domain/elevator";
import {Floor} from "../domain/floor";
import {forEach} from "lodash";
import IFloorRepo from "./IRepos/IFloorRepo";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import {FloorId} from "../domain/floorId";
import {IBuildingDTO} from "../dto/IBuildingDTO";
import {BuildingMap} from "../mappers/BuildingMap";

@Service()
export default class ElevatorService implements IElevatorService{
  constructor(
    @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo,
    @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
    @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
  ) {}

  public async getBuilding( elevatorId: string): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findByDomainId(elevatorId);

      if (elevator === null) {
        return Result.fail<IElevatorDTO>("Building not found");
      }
      else {
        const elevatorDTOResult = ElevatorMap.toDTO( elevator ) as IElevatorDTO;
        return Result.ok<IElevatorDTO>( elevatorDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }

  public async getElevatorById( elevatorId: string): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findByDomainId(elevatorId);

      if (elevator === null) {
        return Result.fail<IElevatorDTO>("Elevator not found");
      }
      else {
        const roleDTOResult = ElevatorMap.toDTO( elevator ) as IElevatorDTO;
        return Result.ok<IElevatorDTO>( roleDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }

  public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      /*const building: Building = await this.buildingRepo.findByDomainId(elevatorDTO.building);
      const floorList: Array<Floor> = new Array<Floor>();

      elevatorDTO.building = building;

      for (const floorId of elevatorDTO.floorList) {
        // Fetch the Floor object based on the floorId
        const floor = await this.floorRepo.findByDomainId(floorId);


        if (!floor) {
          // Handle the case where the floor doesn't exist or is not found
          // You can return an error or take appropriate action
          return Result.fail<IElevatorDTO>("Floor not found for ID: " + floorId.id);
        }

        floorList.push(floor);
      }

      // Replace the floor IDs with the actual Floor objects in elevatorDTO
      elevatorDTO.floorList = floorList;*/

      const elevatorOrError = await Elevator.create(elevatorDTO);

      if (elevatorOrError.isFailure) {
        return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
      }

      const elevatorResult = elevatorOrError.getValue();

      await this.elevatorRepo.save(elevatorResult);

      const elevatorDTOResult = ElevatorMap.toDTO(elevatorResult) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(elevatorDTOResult);
    } catch (e) {
      throw e;
    }
  }


  public async updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {

    try {
      const elevator = await this.elevatorRepo.findByDomainId(elevatorDTO.id);

      if (elevator === null) {
        return Result.fail<IElevatorDTO>("Building not found");
      }
      else {

          elevator.props.building= elevatorDTO.building;
          elevator.props.floorList= elevatorDTO.floorList;
          elevator.props.brand= elevatorDTO.brand;
          elevator.props.model= elevatorDTO.model;
          elevator.props.serialNumber= elevatorDTO.serialNumber;
          elevator.props.description= elevatorDTO.description;

        await this.elevatorRepo.save(elevator);

        const buildingDTOResult = ElevatorMap.toDTO( elevator ) as IElevatorDTO;
        return Result.ok<IElevatorDTO>( buildingDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }


  public async getAllElevators():Promise<Result<IElevatorDTO[]>>  {
    try {
      // Implement the logic to retrieve a list of all buildings from your data source
      // For example, if you have a BuildingRepository, you can call a method like getAllBuildings from there

      const elevators = await this.elevatorRepo.findAll();

      // Return the list of building DTOs
      return Result.ok<IElevatorDTO[]>(elevators);
    } catch (error) {
      // Handle any errors, log them, and return a Result indicating failure
      console.error('Error while fetching elevators:', error);
      return Result.fail('Failed to fetch elevators');
    }
  }


  async getFloorsByIds(floorIds: Array<string>): Promise<Array<Floor>> {
    // Implements the logic to query the database and retrieve floors based on the provided IDs
    const newFloorList= new Array<Floor>();

    try{
      for (let floorId of floorIds) {
       newFloorList.push( await this.floorRepo.findByDomainId(floorId));
    }

    }catch (e){
      throw e;
    }

    // Returns an array of Floor objects
    return newFloorList;
  }




  async associateFloorsWithElevator(elevator: Elevator, floorIds: string[]): Promise<Elevator> {

    // Use the getFloorsByIds method to fetch the Floor objects based on the provided IDs
    const floors = await this.getFloorsByIds(floorIds);

    // Assuming that 'elevator' has a property 'floors' to store the list of floors
    // Set the 'floors' property of the 'elevator' to the fetched 'floors'
    // elevator.setFloorList(floors);

    // Save the updated 'elevator' to your data source (e.g., a database) if necessary
    return elevator;
  }



}
