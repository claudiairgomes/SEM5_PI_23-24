"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Building = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const buildingId_1 = require("./buildingId");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
class Building extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get buildingId() {
        return buildingId_1.BuildingId.caller(this.id);
    }
    get name() {
        return this.props.name;
    }
    get description() {
        return this.props.description;
    }
    get dimension() {
        return this.props.dimension;
    }
    get code() {
        return this.props.code;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.name, argumentName: 'name' },
            { argument: props.description, argumentName: 'description' },
            { argument: props.dimension, argumentName: 'dimension' },
            { argument: props.code, argumentName: 'code' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            const building = new Building(Object.assign({}, props), id);
            return Result_1.Result.ok(building);
        }
    }
}
exports.Building = Building;
//# sourceMappingURL=building.js.map