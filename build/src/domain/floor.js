"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Floor = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const floorId_1 = require("./floorId");
const Guard_1 = require("../core/logic/Guard");
class Floor extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get floorId() {
        return floorId_1.FloorId.caller(this.id);
    }
    get buildingId() {
        return this.props.buildingId;
    }
    get floorNumber() {
        return this.props.floorNumber;
    }
    get description() {
        return this.props.description;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.buildingId, argumentName: 'buildingId' },
            { argument: props.floorNumber, argumentName: 'floorNumber' },
            { argument: props.description, argumentName: 'description' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            const floor = new Floor(Object.assign({}, props), id);
            return Result_1.Result.ok(floor);
        }
    }
}
exports.Floor = Floor;
//# sourceMappingURL=floor.js.map