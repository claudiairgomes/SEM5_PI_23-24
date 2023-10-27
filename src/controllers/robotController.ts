import {Response, Request, NextFunction} from 'express';

import {Container, Inject, Service} from 'typedi';

import config from '../../config';
import {Result} from "../core/logic/Result";
import IRobotRepo from '../services/IRepos/IRobotRepo';

import { RobotMap } from "../mappers/RobotMap";
import { IRobotDTO } from '../dto/IRobotDTO';
import IBuildingController from "./IControllers/IBuildingController";
import IBuildingService from "../services/IServices/IBuildingService";
import IRobotController from "./IControllers/IRobotController";
import IRobotService from "../services/IServices/IRobotService";


@Service()
export default class RobotController implements IRobotController /* TODO: extends ../core/infra/BaseController */ {

  constructor(
    @Inject(config.services.robot.name) private robotServiceInstance : IRobotService
  ) {}

 public async getAllRobots(req: Request, res: Response, next: NextFunction) {
  };

  public async getRobotById(req: Request, res: Response, next: NextFunction) {
  };

  public async updateRobot(req: Request, res: Response, next: NextFunction) {
  };


//exports.getMe = async function(req, res: Response) {

  // NB: a arquitetura ONION não está a ser seguida aqui

 /* const robotRepo = Container.get(config.repos.robot.name) as IRobotRepo

  if( !req.token || req.token == undefined )
    return res.json( new Error("Token inexistente ou inválido")).status(401);

  const robot = await robotRepo.findById( req.token.id );
  if (!robot)
    return res.json( new Error("Utilizador não registado")).status(401);

  const robotDTO = RobotMap.toDTO( robot ) as IRobotDTO;
  return res.json( robotDTO ).status(200);

  */
}
