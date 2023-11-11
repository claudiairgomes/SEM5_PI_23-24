"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const robot_1 = require("../domain/robot");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class RobotMap extends Mapper_1.Mapper {
    static toDTO(robot) {
        return {
            //id: robot.id.toString(),
            codRobot: robot.codRobot,
            nickname: robot.nickname,
            type: robot.type,
            serialNumber: robot.serialNumber,
            description: robot.description,
        };
    }
    static async toDomain(raw) {
        //const repo = Container.get(RoleRepo);
        //const role = await repo.findByDomainId(raw.role);
        const robotOrError = robot_1.Robot.create({
            codRobot: raw.codRobot,
            nickname: raw.nickname,
            type: raw.type,
            serialNumber: raw.serialNumber,
            description: raw.description,
        }, new UniqueEntityID_1.UniqueEntityID(raw.domainId));
        robotOrError.isFailure ? console.log(robotOrError.error) : '';
        return robotOrError.isSuccess ? robotOrError.getValue() : null;
    }
    static toPersistence(robot) {
        const a = {
            domainId: robot.id.toString(),
            codRobot: robot.codRobot,
            nickname: robot.nickname,
            type: robot.type,
            serialNumber: robot.serialNumber,
            description: robot.description,
        };
        return a;
    }
}
exports.RobotMap = RobotMap;
//# sourceMappingURL=RobotMap.js.map