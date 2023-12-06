import { Router} from 'express';
import {celebrate, Joi} from "celebrate";

import { Container } from 'typedi';
import IBuildingController from "../../controllers/IControllers/IBuildingController";

import config from "../../../config";

const route = Router();

export default (app:Router) => {
  app.use('/buildings',route)

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        dimension: Joi.string().required(),
        code: Joi.string().required()

      })
    }),
    (req, res, next) => ctrl.createBuilding(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        dimension: Joi.string().required(),
        code: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateBuilding(req, res, next) );


  route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        description: Joi.string(),
        dimension: Joi.string(),
        code: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.updateBuilding(req, res, next) );

  route.get(
    '/findAll',
    (req, res, next) => ctrl.getBuildings(req, res, next)
  );

  route.get('',
  celebrate({
    body: Joi.object({
      id: Joi.string().required(),

    }),
  }),
  (req, res, next) => ctrl.getBuildingById(req, res, next) );
  //  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);

}
