import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from '../../../config';
import ISystemUserController from '../../controllers/IControllers/ISystemUserController';

const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  const ctrl = Container.get(config.controllers.systemUser.name) as ISystemUserController;

  //API POST request - create a new SystemUser
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string(),
        role: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.createSystemUser(req, res, next),
  );


// Create the route for removing a system user
  route.delete(
    '/remove',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(), // Assuming you pass the user ID as a route parameter
      }),
    }),
    (req, res, next) => ctrl.removeSystemUser(req, res, next),
  );

  route.get('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),

      }),
    }),
    (req, res, next) => ctrl.getSystemUserById(req, res, next) );

  route.get('',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),

      }),
    }),
    (req, res, next) => ctrl.getSystemUserByEmail(req, res, next) );

  route.get('roleById',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),

      }),
    }),
    (req, res, next) => ctrl.getSystemUserByEmail(req, res, next) );


};
