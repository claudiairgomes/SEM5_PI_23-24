import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';

import ISystemUserController from './IControllers/ISystemUserController';
import ISystemUserService from '../services/IServices/ISystemUserService';
import ISystemUserDTO from '../dto/ISystemUserDTO';
import {IBuildingDTO} from "../dto/IBuildingDTO";

@Service()
export default class SystemUserController implements ISystemUserController {
  constructor(@Inject(config.services.systemUser.name) private systemUserServiceInstance: ISystemUserService) {}

  public async createSystemUser(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = (await this.systemUserServiceInstance.createSystemUser(
        req.body as ISystemUserDTO,
      )) as Result<ISystemUserDTO>;

      if (buildingOrError.isFailure) {
        return res.status(402).send(buildingOrError.errorValue());
      }

      const buildingDTO = buildingOrError.getValue();
      return res.json(buildingDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async removeSystemUser(req: Request, res: Response, next: NextFunction) {
    try {
      const systemUserOrError = (await this.systemUserServiceInstance.removeSystemUser(
        req.body as ISystemUserDTO)) as Result<void>;

      if (systemUserOrError.isFailure) {
        return res.status(402).send(systemUserOrError.errorValue());
      }

      return res.status(200).json({ message: 'System user removed successfully' });
    } catch (e) {
      return next(e);
    }
  }

  async getSystemUserById(req: Request, res: Response, next: NextFunction) {
    try{
      const systemUserOrError = await this.systemUserServiceInstance.getSystemUserById(req.body) as Result<ISystemUserDTO>;

      if (systemUserOrError.isFailure) {
        return res.status(404).send();
      }

      const systemUserDTO = systemUserOrError.getValue();
      return res.status(201).json( systemUserDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  async getSystemUserByEmail(req: Request, res: Response, next: NextFunction) {
    try{
      const systemUserOrError = await this.systemUserServiceInstance.getSystemUserByEmail(req.body) as Result<ISystemUserDTO>;

      if (systemUserOrError.isFailure) {
        return res.status(404).send();
      }

      const systemUserDTO = systemUserOrError.getValue();
      return res.status(201).json( systemUserDTO );
    }
    catch (e) {
      return next(e);
    }
  }


}
