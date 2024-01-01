import {Router} from "express";
import {Container} from "typedi";
import config from "../../../config";
import IElevatorController from "../../controllers/IControllers/IElevatorController";
import {celebrate, Joi} from "celebrate";
import authRole from "../middlewares/authRole";

const route= Router();

export default (app:Router)=> {
  app.use('/elevators', route)

  const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;

  route.post('',
    authRole(config.permissions.elevator.post),

    celebrate({
      body: Joi.object({
        building: Joi.string().required(),
        floorList: Joi.array().items(Joi.string().required()).required(),
        //floorsIdList: Joi.array().items(Joi.object({id:Joi.string().required()})).required(),
        brand: Joi.string().required(),
        model: Joi.string().required(),
        serialNumber: Joi.string().required(),
        description: Joi.string().optional()
      })
    }),
    (req, res, next) => ctrl.createElevator(req, res, next));

  route.put('',
    authRole(config.permissions.elevator.put),

    celebrate({
      body: Joi.object({
        elevatorDomainId: Joi.string().required(),
        building: Joi.string().required(),
        floorList: Joi.array().items(Joi.string()).required(),
        brand: Joi.string().required(),
        model: Joi.string().required(),
        serialNumber: Joi.string().required(),
        description: Joi.string().optional()

      })
    }),
    (req, res, next) => ctrl.updateElevator(req, res, next));

  route.get(
    '/findAll',
    authRole(config.permissions.elevator.get),

    (req, res, next) => ctrl.getElevators(req, res, next)
  );

  route.get('/elevatorFromBuilding/:buildingId',
    authRole(config.permissions.elevator.get),
    (req, res, next) => ctrl.getElevatorByBuilding(req, res, next));

}
