import { Service, Inject } from 'typedi';
import config from "../../config";

import {IRobotDTO} from '../dto/IRobotDTO';
import { Robot } from "../domain/robot";
import IRobotRepo from '../services/IRepos/IRobotRepo';
import IRobotService from './IServices/IRobotService';
import { Result } from "../core/logic/Result";
import { RobotMap } from "../mappers/RobotMap";
import {IBuildingDTO} from "../dto/IBuildingDTO";
import {BuildingMap} from "../mappers/BuildingMap";


@Service()
export default class RobotService implements IRobotService {
  constructor(
    @Inject(config.repos.robot.name) private robotRepo : IRobotRepo
  ) {}

  public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {

      const robotOrError = await Robot.create({codRobot: robotDTO.codRobot, name: robotDTO.name, type:robotDTO.type, serialNumber:robotDTO.serialNumber, description:robotDTO.description == null ?'': robotDTO.description , isActive:robotDTO.isActive} );

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
        if (robotDTO.isActive!==undefined){
          robot.props.isActive = robotDTO.isActive;
        }
        await this.robotRepo.save(robot);

        const robotDTOResult = RobotMap.toDTO( robot ) as IRobotDTO;
        return Result.ok<IRobotDTO>( robotDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }

  public async deactivateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {

      const robot = await this.robotRepo.findByDomainId(robotDTO.id);

      if (robot === null) {
        return Result.fail<IRobotDTO>("Robot with ID: '" + robotDTO.id + "' not found");
      }

      // sets the Robot isActive to false
      robot.isActive = false;

      //saves the robot with the update and returns the robot DTO
      await this.robotRepo.save(robot);

      const robotDTOResult = RobotMap.toDTO( robot ) as IRobotDTO;

      return Result.ok<IRobotDTO>( robotDTOResult )

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

  public async getRobotById(robotId:string): Promise<Result<IRobotDTO>> {

    // try{
    console.log("Robot of id:")
    const robot = await this.robotRepo.findByDomainId(robotId);

    console.log("Robot of id:")
    console.log(robot);

    const robotDTOResult = RobotMap.toDTO( robot ) as IRobotDTO;
    return Result.ok<IRobotDTO>( robotDTOResult )

    console.log(robotDTOResult);
    /*} catch (error) {
        // Handle any errors, log them, and return a Result indicating failure
        console.error('Error while fetching building:', error);
        return Result.fail('Failed to get building');
      }*/
  }

  public async getAllRobotsWithNickname(robotNickname: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      const robotFound: Robot = await this.robotRepo.findByNickname(robotNickname);
      let robotFoundDto: IRobotDTO;

      if (robotFound != null) {
        robotFoundDto = RobotMap.toDTO(robotFound);
        return Result.ok<IRobotDTO>(robotFoundDto);
      }
      return Result.fail<IRobotDTO>("There are no robots with that nickname");

    } catch (e) {
      return Result.fail<IRobotDTO>(e.message);
    }
  }

  public async getRobotsByNicknameOrTaskType(robotNickname: IRobotDTO, taskType?: string): Promise<Result<IRobotDTO[]>> {
    try {
      let robots: Robot[];

      if (taskType) {
        // If taskType is provided, retrieve robots by taskType
        robots = await this.robotRepo.findByNicknameOrTaskType(robotNickname, taskType);
      } else {
        // Retrieve robots by nickname
        const robotFound: Robot = await this.robotRepo.findByNickname(robotNickname);
        robots = robotFound ? [robotFound] : [];
      }

      const robotDTOs = robots.map(robot => RobotMap.toDTO(robot));

      return Result.ok<IRobotDTO[]>(robotDTOs);
    } catch (error) {
      return Result.fail<IRobotDTO[]>(error.message);
    }
  }



}
