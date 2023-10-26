import { Service, Inject } from 'typedi';
import config from "../../config";
import {IRobotDTO} from '../dto/IRobotDTO';
import { Robot } from "../domain/robot";
import IRobotRepo from '../services/IRepos/IRobotRepo';
import IRobotService from './IServices/IRobotService';
import { Result } from "../core/logic/Result";
import { RobotMap } from "../mappers/RobotMap";

@Service()
export default class RobotService implements IRobotService {
  constructor(
    @Inject(config.repos.robot.name) private robotRepo : IRobotRepo
  ) {}

  public async getRobot( robotId: string): Promise<Result<IRobotDTO>> {
    try {
      const robot = await this.robotRepo.findByDomainId(robotId);

      if (robot === null) {
        return Result.fail<IRobotDTO>("Robot not found");
      }
      else {
        const robotDTOResult = RobotMap.toDTO( robot ) as IRobotDTO;
        return Result.ok<IRobotDTO>( robotDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }


  public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {

      const robotOrError = await Robot.create({codRobot: robotDTO.codRobot, nickname: robotDTO.nickname, type:robotDTO.type, serialNumber:robotDTO.serialNumber, description:robotDTO.description == null ?'': robotDTO.description } );

      if (robotOrError.isFailure) {
        return Result.fail<IRobotDTO>(robotOrError.errorValue());
      }

      const robotResult = robotOrError.getValue();

      await this.robotRepo.save(robotResult);

      const robotDTOResult = RobotMap.toDTO( robotResult ) as IRobotDTO;
      return Result.ok<IRobotDTO>( robotDTOResult )
    } catch (e) {
      throw e;
    }
  }
}
