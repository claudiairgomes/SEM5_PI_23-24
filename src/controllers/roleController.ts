import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRoleController from "./IControllers/IRoleController";
import IRoleService from '../services/IServices/IRoleService';
import IRoleDTO from '../dto/IRoleDTO';

import { Result } from "../core/logic/Result";
import {IBuildingDTO} from "../dto/IBuildingDTO";

@Service()
export default class RoleController implements IRoleController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.role.name) private roleServiceInstance : IRoleService
  ) {}

  public async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.createRole(req.body as IRoleDTO) as Result<IRoleDTO>;

      if (roleOrError.isFailure) {
        return res.status(402).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.json( roleDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.updateRole(req.body as IRoleDTO) as Result<IRoleDTO>;

      if (roleOrError.isFailure) {
        return res.status(404).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.status(201).json( roleDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await this.roleServiceInstance.getAllRoles();

      if (!roles || roles.length === 0) {
        // Return an appropriate response if there are no floors
        return res.status(404).json({ message: 'No roles found' });
      }

      return res.status(200).json(roles);
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error while fetching roles:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getRoleById(req: Request, res: Response, next: NextFunction) {
    try{
      const roleOrError = await this.roleServiceInstance.getRole(req.body) as Result<IRoleDTO>;

      if (roleOrError.isFailure) {
        return res.status(404).send();
      }

      const buildingDTO = roleOrError.getValue();
      return res.status(201).json( buildingDTO );
    }
    catch (e) {
      return next(e);
    }
  }

}
