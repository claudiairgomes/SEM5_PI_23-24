"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const building_1 = require("../domain/building");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class BuildingMap extends Mapper_1.Mapper {
    static toDTO(building) {
        return {
            id: building.id.toString(),
            name: building.name,
            description: building.description,
            dimension: building.dimension,
            code: building.code,
        };
    }
    static async toDomain(raw) {
        const buildingOrError = building_1.Building.create({
            name: raw.firstName,
            description: raw.description,
            dimension: raw.dimension,
            code: raw.code,
        }, new UniqueEntityID_1.UniqueEntityID(raw.domainId));
        buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
        return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
    }
    static toPersistence(building) {
        const a = {
            domainId: building.id.toString(),
            name: building.name,
            description: building.description,
            dimension: building.dimension,
            code: building.code
        };
        return a;
    }
}
exports.BuildingMap = BuildingMap;
//# sourceMappingURL=BuildingMap.js.map