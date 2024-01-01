import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot";
import {RobotId} from "../../domain/robotId";
import {BuildingId} from "../../domain/buildingId";
import {Building} from "../../domain/building";
import {IRobotDTO} from "../../dto/IRobotDTO";


export default interface IRobotRepo extends Repo<Robot> {
  save(robot: Robot): Promise<Robot>;
  findByDomainId (robotId: RobotId | string): Promise<Robot>;
  findById (id: string): Promise<Robot>;
  findAll();
  findByNickname(robotNickname: IRobotDTO): Promise<Robot>;

  findByTaskType(taskType: string): Promise<Robot[]>;
  findByNicknameOrTaskType(robotNickname: IRobotDTO, taskType: string): Promise<Robot[]>;
}
