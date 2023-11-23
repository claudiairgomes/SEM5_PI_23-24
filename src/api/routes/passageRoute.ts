import { Router} from 'express';
import {celebrate, Joi} from "celebrate";

import { Container } from 'typedi';
import IPassageController from "../../controllers/IControllers/IPassageController";

import config from "../../../config";

const route = Router();

export default (app:Router) => {
  app.use('/passage',route)

  const ctrl = Container.get(config.controllers.passage.name) as IPassageController;

  route.post('',
    celebrate({
      body: Joi.object({
        fromFloorId: Joi.string().required(),
        toFloorId: Joi.string().required(),
       // floorId: Joi.number().required(),
        description: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.createPassage(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        fromFloorId: Joi.string().required(),
        toFloorId: Joi.string().required(),
        description: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updatePassage(req, res, next) );

  route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        fromFloorId: Joi.string().required(),
        toFloorId: Joi.string().required(),
        description: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updatePassage(req, res, next) );

}
