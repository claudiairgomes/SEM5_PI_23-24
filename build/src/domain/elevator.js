"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elevator = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
const elevatorId_1 = require("./elevatorId");
class Elevator extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get ElevatorId() {
        return elevatorId_1.ElevatorId.caller(this.id);
    }
    get building() {
        return this.props.building;
    }
    get floorList() {
        return this.props.floorList;
    }
    setFloorList(floorList) {
        this.props.floorList = floorList;
    }
    get brand() {
        return this.props.brand;
    }
    get model() {
        return this.props.model;
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
            { argument: props.building, argumentName: 'building' },
            { argument: props.floorList, argumentName: 'floorList' },
            { argument: props.brand, argumentName: 'brand' },
            { argument: props.model, argumentName: 'model' },
            { argument: props.serialNumber, argumentName: 'serialNumber' },
            { argument: props.description, argumentName: 'description' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            const elevator = new Elevator(Object.assign({}, props), id);
            return Result_1.Result.ok(elevator);
        }
    }
}
exports.Elevator = Elevator;
//# sourceMappingURL=elevator.js.map