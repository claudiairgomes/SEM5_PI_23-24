import IElevatorService from "./IServices/IElevatorService";
import {IElevatorDTO} from "../dto/IElevatorDTO";
import {Result} from "../core/logic/Result";
import {Inject, Service} from "typedi";

import config from "../../config";
import {Building} from "../domain/building";
import IElevatorRepo from "./IRepos/IElevatorRepo";
import {ElevatorMap} from "../mappers/ElevatorMap";
import {Elevator} from "../domain/elevator";
@Service()
export default class ElevatorService implements IElevatorService{
  constructor(
    @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo
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


  public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {

      const elevatorOrError = await Elevator.create( elevatorDTO );

      if (elevatorOrError.isFailure) {
        return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
      }

      const elevatorResult = elevatorOrError.getValue();

      await this.elevatorRepo.save(elevatorResult);

      const elevatorDTOResult = ElevatorMap.toDTO( elevatorResult ) as IElevatorDTO;
      return Result.ok<IElevatorDTO>( elevatorDTOResult )
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


  public async getAllElevators() {
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
}
