import { Router} from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotController from '../../controllers/IControllers/IRobotController';

import config from "../../../config";
import jwt from "jsonwebtoken";

const route = Router();


export default (app: Router) => {
  app.use('/robots', route);

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        codRobot: Joi.string().required(),
        name: Joi.string().required(),
        type: Joi.string().required(),
        serialNumber: Joi.string().required(),
        description: Joi.string().required(),
        isActive: Joi.boolean().required(),
      }),
    }),
    (req, res, next) => ctrl.createRobot(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        codRobot : Joi.string().required(),
        name: Joi.string().required(),
        type: Joi.string().required(),
        serialNumber: Joi.string().required(),
        description: Joi.string().required(),
        isActive: Joi.boolean().required(),
      }),
    }),
    (req, res, next) => ctrl.updateRobot(req, res, next) );

  route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        codRobot : Joi.string(),
        name: Joi.string(),
        type: Joi.string(),
        serialNumber: Joi.string(),
        description: Joi.string(),
        isActive:Joi.boolean(),
      }),
    }),
    (req, res, next) => ctrl.updateRobot(req, res, next) );


  route.patch(
    '/deactivate',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.deactivateRobot(req, res, next),
  );

  route.get(
    '/findAll',
    (req, res, next) => ctrl.getAllRobots(req, res, next)
  );

  route.get('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getRobotById(req, res, next) );
  //  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);
};



