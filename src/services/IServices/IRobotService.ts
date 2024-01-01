import {IRobotDTO} from "../../dto/IRobotDTO";
import {Result} from "../../core/logic/Result";
import {IBuildingDTO} from "../../dto/IBuildingDTO";


export default interface IRobotService{
  createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;

  updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;

  getAllRobots():Promise<Result<IRobotDTO>>;
  deactivateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  getRobotById(robotId:string):Promise<Result<IRobotDTO>>;
  getAllRobotsWithNickname(robotNickname: IRobotDTO): Promise<Result<IRobotDTO>>;
  getRobotsByNicknameOrTaskType(robotNickname: IRobotDTO, taskType?: string): Promise<Result<IRobotDTO[]>>;
}
