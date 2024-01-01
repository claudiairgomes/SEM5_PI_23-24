import { Router} from 'express';
import {celebrate, Joi} from "celebrate";

import { Container } from 'typedi';
import IBuildingController from "../../controllers/IControllers/IBuildingController";

import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import authRole from '../middlewares/authRole';

import config from "../../../config";

const route = Router();

export default (app:Router) => {
  app.use('/buildings',route)

  route.use(isAuth);
  route.use(attachCurrentUser);
  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

  route.post('',
    authRole(config.permissions.building.post),
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        dimension: Joi.string().required(),
        code: Joi.string().required()

      })
    }),
    (req, res, next) => ctrl.createBuilding(req, res, next) );

  route.put('/update',
    authRole(config.permissions.building.put),
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
    authRole(config.permissions.building.get),
    (req, res, next) => ctrl.getBuildings(req, res, next)
  );

  route.get('',
    authRole(config.permissions.building.get),
    celebrate({
    body: Joi.object({
      id: Joi.string().required(),

    }),
  }),
  (req, res, next) => ctrl.getBuildingById(req, res, next) );

  route.get('range',
    authRole(config.permissions.building.get),
    celebrate({
    body: Joi.object({
      min: Joi.number().required(),
      max: Joi.number().required()

    }),
  }),
  (req, res, next) => ctrl.getBuildingsByRange(req, res, next) );



  //  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);

}
