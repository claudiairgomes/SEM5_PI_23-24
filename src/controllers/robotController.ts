import {Response, Request, NextFunction} from 'express';

import {Container, Inject, Service} from 'typedi';

import config from '../../config';
import {Result} from "../core/logic/Result";
import { IRobotDTO } from '../dto/IRobotDTO';
import IRobotController from "./IControllers/IRobotController";
import IRobotService from "../services/IServices/IRobotService";



@Service()
export default class RobotController implements IRobotController /* TODO: extends ../core/infra/BaseController */ {

  constructor(
    @Inject(config.services.robot.name) private robotServiceInstance : IRobotService
  ) {}

  public async createRobot(req: Request, res: Response, next: NextFunction) {
    try {

      const robotOrError = await this.robotServiceInstance.createRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

      if (robotOrError.isFailure) {
        return res.status(402).send();
      }

      const robotDTO = robotOrError.getValue();
      return res.json( robotDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };
  public async updateRobot(req: Request, res: Response, next: NextFunction) {
    try {

      const robotOrError = await this.robotServiceInstance.updateRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

      if (robotOrError.isFailure) {
        return res.status(404).send();
      }

      const robotDTO = robotOrError.getValue();
      return res.status(201).json( robotDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAllRobots(req: Request, res: Response, next: NextFunction) {
    try {
      const robots = await this.robotServiceInstance.getAllRobots();

      if (!robots || robots.length === 0) {
        // Return an appropriate response if there are no robots
        return res.status(404).json({ message: 'No robots found' });
      }

      return res.status(200).json(robots);
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error while fetching robots:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }


  async getRobotById(req: Request, res: Response, next: NextFunction) {
    try{
      const robotOrError = await this.robotServiceInstance.getRobotById(req.body) as Result<IRobotDTO>;

      if (robotOrError.isFailure) {
        return res.status(404).send();
      }

      const robotDTO = robotOrError.getValue();
      return res.status(201).json( robotDTO );
    }
    catch (e) {
      return next(e);
    }
  }
}
