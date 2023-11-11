"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const robotId_1 = require("./robotId");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
class Robot extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get robotId() {
        return robotId_1.RobotId.caller(this.id);
    }
    get codRobot() {
        return this.props.codRobot;
    }
    get nickname() {
        return this.props.nickname;
    }
    get type() {
        return this.props.type;
    }
    get serialNumber() {
        return this.props.serialNumber;
    }
    get description() {
        return this.props.description;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.codRobot, argumentName: 'codRobot' },
            { argument: props.nickname, argumentName: 'nickname' },
            { argument: props.type, argumentName: 'type' },
            { argument: props.serialNumber, argumentName: 'serialNumber' },
            { argument: props.description, argumentName: 'description' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            const robot = new Robot(Object.assign({}, props), id);
            return Result_1.Result.ok(robot);
        }
    }
}
exports.Robot = Robot;
//# sourceMappingURL=robot.js.map