import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot";
import {RobotId} from "../../domain/robotId";


export default interface IRobotRepo extends Repo<Robot> {
  save(robot: Robot): Promise<Robot>;
  findByDomainId (robotId: RobotId | string): Promise<Robot>;
  findById (id: string): Promise<Robot>;
  findAll();
}
