import { Router} from 'express';
import {celebrate, Joi} from "celebrate";

import { Container } from 'typedi';
import IRoomController from "../../controllers/IControllers/IRoomController";

import config from "../../../config";

const route = Router();

export default (app:Router) => {
  app.use('/rooms',route)

  const ctrl = Container.get(config.controllers.room.name) as IRoomController;

  route.post('',
    celebrate({
      body: Joi.object({
        floor: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        dimension: Joi.string().required(),
        code: Joi.string().required(),

      })
    }),
    (req, res, next) => ctrl.createRoom(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        floor: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        dimension: Joi.string().required(),
        code: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateRoom(req, res, next) );


  route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        floor: Joi.string(),
        name: Joi.string(),
        description: Joi.string(),
        dimension: Joi.string(),
        code: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.updateRoom(req, res, next) );

  route.get(
    '/findAll',
    (req, res, next) => ctrl.getAllRooms(req, res, next)
  );

  route.get('',
  celebrate({
    body: Joi.object({
      id: Joi.string().required(),

    }),
  }),
  (req, res, next) => ctrl.getRoomById(req, res, next) );
  //  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);

}
