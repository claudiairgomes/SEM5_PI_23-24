import {NextFunction, Request, Response} from "express";
import {Container,Inject,Service} from "typedi";
import config from '../../config';

import IElevatorService from "../services/IServices/IElevatorService";
import IElevatorController from "./IControllers/IElevatorController";
import {IBuildingDTO} from "../dto/IBuildingDTO";
import {Result} from "../core/logic/Result";
import {IElevatorDTO} from "../dto/IElevatorDTO";
import {sortedUniq} from "lodash";


@Service()
export default class ElevatorController implements IElevatorController{

  constructor(
    @Inject(config.services.elevator.name) private elevatorServiceInstance: IElevatorService
  ) {}

  /*async createBuilding(req: Request, res: Response, next: NextFunction) {
  try {
    const buildingDTO = req.body as IBuildingDTO;

    // Extract the 'floorIds' from the request body
    const { floorIds } = req.body;

    // Create the building based on the 'buildingDTO'
    const building = BuildingMap.toDomain(buildingDTO);

    // Associate the floors with the building
    await this.buildingServiceInstance.associateFloorsWithBuilding(building, floorIds);

    // Save the building to your data source

    return res.status(201).json(buildingDTO);
  } catch (error) {
    return next(error);
  }
}*/

  public async createElevator(req: Request, res: Response, next: NextFunction) {
    try {


      const elevatorOrError = await this.elevatorServiceInstance.createElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;

      if (elevatorOrError.isFailure) {
        return res.status(402).send();
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.json( elevatorDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = await this.elevatorServiceInstance.updateElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;

      if (elevatorOrError.isFailure) {
        return res.status(404).send();
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.status(201).json( elevatorDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  /*  public async getBuildings(req: Request, res: Response, next: NextFunction){


      const buildings = await BuildingService.getAllBuildings();

      // Send the buildings as a response
      res.json(buildings);

    }

   */
  public async getElevators(req: Request, res: Response, next: NextFunction) {
    try {
      const elevators = await this.elevatorServiceInstance.getAllElevators();

      if (!elevators || elevators.length === 0) {
        // Return an appropriate response if there are no elevators
        return res.status(404).json({ message: 'No elevators found' });
      }

      return res.status(200).json(elevators);
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error while fetching buildings:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

}
