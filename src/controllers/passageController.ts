import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPassageController from "./IControllers/IPassageController";
import IPassageService from '../services/IServices/IPassageService';
import {IPassageDTO} from '../dto/IPassageDTO';

import { Result } from "../core/logic/Result";

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
}
