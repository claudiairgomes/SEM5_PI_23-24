import { Router} from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotController from '../../controllers/IControllers/IRobotController';

import config from "../../../config";

//var user_controller = require('../../controllers/userController');

const route = Router();


export default (app: Router) => {
  app.use('/robot', route);

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        codRobot: Joi.string().required(),
        nickname: Joi.string().required(),
        type: Joi.string().required(),
        serialNumber: Joi.string().required(),
        description: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateRobot(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        codRobot : Joi.string().required(),
        nickName: Joi.string().required(),
        type: Joi.string().required(),
        serialNumber: Joi.string().required(),
        description: Joi.string().optional(),
      }),
    }),
    (req, res, next) => ctrl.updateRobot(req, res, next) );

  route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        codRobot : Joi.string().required(),
        nickName: Joi.string().required(),
        type: Joi.string().required(),
        serialNumber: Joi.string().required(),
        description: Joi.string().optional(),
      }),
    }),
    (req, res, next) => ctrl.updateRobot(req, res, next) );

  route.get('', (req, res, next) => ctrl.getAllRobots(req, res, next) );
  route.get('/id', (req, res, next) => ctrl.getRobotById(req, res, next) );
  };



