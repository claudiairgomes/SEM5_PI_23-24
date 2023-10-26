import { Response, Request } from 'express';

import { Container} from 'typedi';

import config from '../../config';

import IRobotRepo from '../services/IRepos/IRobotRepo';

import { RobotMap } from "../mappers/RobotMap";
import { IRobotDTO } from '../dto/IRobotDTO';


exports.getMe = async function(req, res: Response) {

  // NB: a arquitetura ONION não está a ser seguida aqui

  const robotRepo = Container.get(config.repos.robot.name) as IRobotRepo

  if( !req.token || req.token == undefined )
    return res.json( new Error("Token inexistente ou inválido")).status(401);

  const robot = await robotRepo.findById( req.token.id );
  if (!robot)
    return res.json( new Error("Utilizador não registado")).status(401);

  const robotDTO = RobotMap.toDTO( robot ) as IRobotDTO;
  return res.json( robotDTO ).status(200);
}
