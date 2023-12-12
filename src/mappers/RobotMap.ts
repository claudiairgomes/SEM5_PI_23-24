

import { Mapper } from "../core/infra/Mapper";

import {IRobotDTO} from "../dto/IRobotDTO";

import { Robot } from "../domain/robot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import RoleRepo from "../repos/roleRepo";
export class RobotMap extends Mapper<Robot> {

  public static toDTO( robot: Robot): IRobotDTO {


    return {
      id: robot.id.toString(),
      codRobot: robot.codRobot,
      name: robot.name,
      type: robot.type,
      serialNumber:robot.serialNumber,
      description:robot.description,
    } as IRobotDTO;
  }

  public static async toDomain (raw: any): Promise<Robot> {

    const robotOrError = Robot.create({
      codRobot: raw.codRobot,
      name: raw.name,
      type: raw.type,
      serialNumber: raw.serialNumber,
      description: raw.description,
    }, new UniqueEntityID(raw.domainId))

    robotOrError.isFailure ? console.log(robotOrError.error) : '';

    return robotOrError.isSuccess ? robotOrError.getValue() : null;
  }

  public static toPersistence (robot: Robot): any {
    const a = {
      domainId: robot.id.toString(),
      codRobot: robot.codRobot,
      name: robot.name,
      type: robot.type,
      serialNumber: robot.serialNumber,
      description: robot.description,
    }
    return a;
  }
}
