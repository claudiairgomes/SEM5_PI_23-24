import { Router} from 'express';
import { Container } from 'typedi';
import IRobotController from '../../controllers/IControllers/IRobotController';
import config from "../../../config";
import AuthService from '../../services/robotService';
import { IRobotDTO } from '../../dto/IRobotDTO';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');

var user_controller = require('../../controllers/userController');

const route = Router();
const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

export default (app: Router) => {
  app.use('/robot', route);

  route.post(
    '/ola',
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

  route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        codRobot : Joi.string().required(),
        nickName: Joi.string().required(),
        type: Joi.string().required(),
        nrSerie: Joi.string().required(),
        description: Joi.string().optional(),
      }),
    }),
    (req, res, next) => ctrl.updateRobot(req, res, next) );

  route.get('', (req, res, next) => ctrl.getAllRobots(req, res, next) );
  route.get('/id', (req, res, next) => ctrl.getRobotById(req, res, next) );
  };



