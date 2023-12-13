import {Response, Request, NextFunction} from 'express';
import {Container, Inject, Service} from 'typedi';
import config from '../../config';

import IPassageRepo from "../services/IRepos/IPassageRepo";
import {PassageMap} from "../mappers/PassageMap";
import {IPassageDTO} from "../dto/IPassageDTO";
import {Result} from "../core/logic/Result";
import IRoleService from "../services/IServices/IRoleService";
import IPassageController from "./IControllers/IPassageController";
import IPassageService from "../services/IServices/IPassageService";
import PassageService from "../services/passageService";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import {IBuildingDTO} from "../dto/IBuildingDTO";
@Service()
export default class PassageController implements IPassageController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.passage.name) private passageServiceInstance : IPassageService
  ) {}

  public async createPassage(req: Request, res: Response, next: NextFunction) {
    try {
      const passageOrError = await this.passageServiceInstance.createPassage(req.body as IPassageDTO) as Result<IPassageDTO>;

      if (passageOrError.isFailure) {
        return res.status(402).send();
      }

      const passageDTO = passageOrError.getValue();
      return res.json( passageDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updatePassage(req: Request, res: Response, next: NextFunction) {
    try {
      const passageOrError = await this.passageServiceInstance.updatePassage(req.body as IPassageDTO) as Result<IPassageDTO>;

      if (passageOrError.isFailure) {
        return res.status(404).send();
      }

      const passageDTO = passageOrError.getValue();
      return res.status(201).json( passageDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  /*  public async getPassages(req: Request, res: Response, next: NextFunction){


      const Passages = await PassageService.getAllPassages();

      // Send the Passages as a response
      res.json(Passages);

    }

   */
  public async getAllPassages(req: Request, res: Response, next: NextFunction) {
    try {
      const passages = await this.passageServiceInstance.getAllPassages();

      if (!passages || passages.length === 0) {
        // Return an appropriate response if there are no passages
        return res.status(404).json({ message: 'No passages found' });
      }

      return res.status(200).json(passages);
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error while fetching passages:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getPassageById(req: Request, res: Response, next: NextFunction) {
    try{
      const passageOrError = await this.passageServiceInstance.getPassageById(req.body) as Result<IPassageDTO>;

      if (passageOrError.isFailure) {
        return res.status(404).send();
      }

      const buildingDTO = passageOrError.getValue();
      return res.status(201).json( buildingDTO );
    }
    catch (e) {
      return next(e);
    }
  }

}
