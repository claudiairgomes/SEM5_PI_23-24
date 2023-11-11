"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const floor_1 = require("../domain/floor");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class FloorMap extends Mapper_1.Mapper {
    static toDTO(floor) {
        return {
            id: floor.id.toString(),
            buildingId: floor.buildingId,
            floorNumber: floor.floorNumber,
            description: floor.description,
        };
    }
    static async toDomain(raw) {
        const floorOrError = floor_1.Floor.create({
            buildingId: raw.buildingId,
            floorNumber: raw.floorNumber,
            description: raw.description,
        }, new UniqueEntityID_1.UniqueEntityID(raw.domainId));
        floorOrError.isFailure ? console.log(floorOrError.error) : '';
        return floorOrError.isSuccess ? floorOrError.getValue() : null;
    }
    static toPersistence(floor) {
        const a = {
            domainId: floor.id.toString(),
            buildingId: floor.buildingId,
            floorNumber: floor.floorNumber,
            description: floor.description,
        };
        return a;
    }
}
exports.FloorMap = FloorMap;
//# sourceMappingURL=FloorMap.js.map