"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassageMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const passage_1 = require("../domain/passage");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class PassageMap extends Mapper_1.Mapper {
    static toDTO(passage) {
        return {
            name: passage.name,
            fromFloor: passage.fromFloor,
            toFloor: passage.toFloor,
            description: passage.description,
        };
    }
    static async toDomain(raw) {
        const passageOrError = passage_1.Passage.create({
            name: raw.name,
            fromFloor: raw.fromFloor,
            toFloor: raw.toFloor,
            description: raw.description,
        }, new UniqueEntityID_1.UniqueEntityID(raw.domainId));
        passageOrError.isFailure ? console.log(passageOrError.error) : '';
        return passageOrError.isSuccess ? passageOrError.getValue() : null;
    }
    static toPersistence(passage) {
        const a = {
            domainId: passage.id.toString(),
            name: passage.name,
            fromFloor: passage.fromFloor,
            toFloor: passage.toFloor,
            description: passage.description,
        };
        return a;
    }
}
exports.PassageMap = PassageMap;
//# sourceMappingURL=PassageMap.js.map
