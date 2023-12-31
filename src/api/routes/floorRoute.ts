import { Router} from 'express';
import {celebrate, Joi} from "celebrate";

import { Container } from 'typedi';
import IFloorController from "../../controllers/IControllers/IFloorController";

import config from "../../../config";

const route = Router();

export default (app:Router) => {
  app.use('/floors',route)

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

  route.post('',
    celebrate({
      body: Joi.object({
        building: Joi.string().required(),
        name:Joi.string().required(),
        number: Joi.number().required(),
        description: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.createFloor(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        building: Joi.string().required(),
        name:Joi.string().required(),
        number: Joi.number().required(),
        description: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateFloor(req, res, next) );


  route.patch('', celebrate({
    body: Joi.object({
      id: Joi.string().required(),
      building: Joi.string(),
      name: Joi.string(),
      number: Joi.number(),
      description: Joi.string(),
    }),
  }), (req, res, next) => ctrl.updateFloor(req, res, next));

  route.get(
    '/findAll',
    (req, res, next) => ctrl.getFloors(req, res, next)
  );


}
