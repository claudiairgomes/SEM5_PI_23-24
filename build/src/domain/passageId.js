"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassageId = void 0;
const Entity_1 = require("../core/domain/Entity");
class PassageId extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    constructor(id) {
        super(null, id);
    }
}
exports.PassageId = PassageId;
//# sourceMappingURL=passageId.js.map