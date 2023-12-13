import {Response, Request, NextFunction} from 'express';
import {Container, Inject, Service} from 'typedi';
import config from '../../config';

import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import {BuildingMap} from "../mappers/BuildingMap";
import {IBuildingDTO} from "../dto/IBuildingDTO";
import {Result} from "../core/logic/Result";
import IRoleService from "../services/IServices/IRoleService";
import IBuildingController from "./IControllers/IBuildingController";
import IBuildingService from "../services/IServices/IBuildingService";
import BuildingService from "../services/buildingService";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
@Service()
export default class BuildingController implements IBuildingController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.building.name) private buildingServiceInstance : IBuildingService
  ) {}


  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

      if (buildingOrError.isFailure) {
        return res.status(402).send();
      }

      const buildingDTO = buildingOrError.getValue();
      return res.json( buildingDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingServiceInstance.updateBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

      if (buildingOrError.isFailure) {
        return res.status(404).send();
      }

      const buildingDTO = buildingOrError.getValue();
      return res.status(201).json( buildingDTO );
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
  public async getBuildings(req: Request, res: Response, next: NextFunction) {
    try {
      const buildings = await this.buildingServiceInstance.getAllBuildings();

      if (!buildings || buildings.length === 0) {
        // Return an appropriate response if there are no buildings
        return res.status(404).json({ message: 'No buildings found' });
      }

      return res.status(200).json(buildings);
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error while fetching buildings:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }


  async getBuildingById(req: Request, res: Response, next: NextFunction) {
    try{
    const buildingOrError = await this.buildingServiceInstance.getBuildingById(req.body) as Result<IBuildingDTO>;

    if (buildingOrError.isFailure) {
      return res.status(404).send();
    }

    const buildingDTO = buildingOrError.getValue();
    return res.status(201).json( buildingDTO );
  }
  catch (e) {
    return next(e);
  }
  }

  async getBuildingsByRange(req: Request, res: Response, next: NextFunction) {
    try{
      let min = req.params.min;
      let max = req.params.max;
      const buildings = await this.buildingServiceInstance.getBuildingsByFloorRange(+min, +max) as Result<Array<IBuildingDTO>>;
        
      if (buildings.isFailure) {
        return res.status(402).json(buildings.errorValue()).send();
      }

      const buildingsDTO = buildings.getValue();
      return res.json( buildingsDTO ).status(200);
    }catch(e){
      return next(e);
    }
  }

}
