import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IFloorController from "./IControllers/IFloorController";
import IFloorService from '../services/IServices/IFloorService';
import {IFloorDTO} from '../dto/IFloorDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class FloorController implements IFloorController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.floor.name) private floorServiceInstance : IFloorService
  ) {}

  public async createFloor(req: Request, res: Response, next: NextFunction) {
    try {

      const floorOrError = await this.floorServiceInstance.createFloor(req.body as IFloorDTO) as Result<IFloorDTO>;

      if (floorOrError.isFailure) {
        return res.status(402).send();
      }

      const floorDTO = floorOrError.getValue();
      return res.json( floorDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateFloor(req: Request, res: Response, next: NextFunction) {
    try {

      const floorOrError = await this.floorServiceInstance.updateFloor(req.body as IFloorDTO) as Result<IFloorDTO>;

      if (floorOrError.isFailure) {
        return res.status(404).send();
      }

      const floorDTO = floorOrError.getValue();
      return res.status(201).json( floorDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getFloors(req: Request, res: Response, next: NextFunction) {
    try {
      const floors = await this.floorServiceInstance.getAllFloors();

      if (!floors || floors.length === 0) {
        // Return an appropriate response if there are no floors
        return res.status(404).json({ message: 'No floors found' });
      }

      return res.status(200).json(floors);
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error while fetching floors:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getFloorById(req: Request, res: Response, next: NextFunction) {
    try{
      const floorOrError = await this.floorServiceInstance.getFloorById(req.body) as Result<IFloorDTO>;

      if (floorOrError.isFailure) {
        return res.status(404).send();
      }

      const buildingDTO = floorOrError.getValue();
      return res.status(201).json( buildingDTO );
    }
    catch (e) {
      return next(e);
    }
  }

}
