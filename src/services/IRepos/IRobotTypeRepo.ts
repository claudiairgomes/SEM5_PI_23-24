import { Repo } from "../../core/infra/Repo";
import { RobotType } from "../../domain/robotType";
import {RobotTypeId} from "../../domain/robotTypeId";



export default interface IRobotTypeRepo extends Repo<RobotType> {
    save(robotType: RobotType): Promise<RobotType>;
    findByDomainId(robotTypeId: RobotTypeId | string): Promise<RobotType>;
    findByObjectId (robotTypeId: RobotTypeId | string): Promise<RobotType>;
    findByCode(code: string): Promise<RobotType>;
    findAll(): Promise<RobotType[]>;
}
