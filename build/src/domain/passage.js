"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passage = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
const passageId_1 = require("./passageId");
class Passage extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get passageId() {
        return passageId_1.PassageId.caller(this.id);
    }

    get name() {
      return this.props.name;
    }
    get fromFloor() {
        return this.props.fromFloor;
    }
    get toFloor() {
        return this.props.toFloor;
    }
    get description() {
        return this.props.description;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.name, argumentName: 'name' },
            { argument: props.fromFloor, argumentName: 'fromFloor' },
            { argument: props.toFloor, argumentName: 'toFloor' },
            { argument: props.description, argumentName: 'description' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            const passage = new Passage(Object.assign({}, props), id);
            return Result_1.Result.ok(passage);
        }
    }
}
exports.Passage = Passage;
//# sourceMappingURL=passage.js.map
