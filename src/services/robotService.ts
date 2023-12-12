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

  public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {

      const robotOrError = await Robot.create({codRobot: robotDTO.codRobot, name: robotDTO.name, type:robotDTO.type, serialNumber:robotDTO.serialNumber, description:robotDTO.description == null ?'': robotDTO.description } );

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

  public async updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {


    try {
      const robot = await this.robotRepo.findByDomainId(robotDTO.id);
      // const floor = await this.floorRepo.findByDomainId(floorDTO.id);

      if (robot === null) {
        return Result.fail<IRobotDTO>("Robot not found");
      }
      else {
        // Check which fields are present in the request and update them
        if(robotDTO.name!== undefined){
          robot.props.name = robotDTO.name;
        }
        if (robotDTO.description!==undefined){
          robot.props.description  = robotDTO.description;
        }
        if (robotDTO.codRobot!==undefined){
          robot.props.codRobot = robotDTO.codRobot;
        }
        if (robotDTO.type!==undefined){
          robot.props.type = robotDTO.type;
        }
        if (robotDTO.serialNumber!==undefined){
          robot.props.serialNumber = robotDTO.serialNumber;
        }
        await this.robotRepo.save(robot);

        const robotDTOResult = RobotMap.toDTO( robot ) as IRobotDTO;
        return Result.ok<IRobotDTO>( robotDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }


  public async getAllRobots() :Promise<Result<IRobotDTO>>{
    try {
      // Implement the logic to retrieve a list of all robots from your data source
      // For example, if you have a RobotRepository, you can call a method like getAllRobots from there

      const robots = await this.robotRepo.findAll();

      // Return the list of robot DTOs
      return robots;
    } catch (error) {
      // Handle any errors, log them, and return a Result indicating failure
      console.error('Error while fetching robots:', error);
      return Result.fail('Failed to fetch robots');
    }
  }


}
