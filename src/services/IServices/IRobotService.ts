import {IRobotDTO} from "../../dto/IRobotDTO";
import {Result} from "../../core/logic/Result";
import {IBuildingDTO} from "../../dto/IBuildingDTO";


export default interface IRobotService{
  createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;

  updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
<<<<<<< Updated upstream
  getAllRobots():Promise<Result<IRobotDTO>>;
=======

  getAllRobots():Promise<Result<IRobotDTO>> ;

  getRobotById(robotId:string):Promise<Result<IRobotDTO>>;

>>>>>>> Stashed changes
}
