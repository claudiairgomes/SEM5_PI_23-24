"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const mongoose_1 = require("mongoose");
const floorId_1 = require("../domain/floorId");
const FloorMap_1 = require("../mappers/FloorMap");
let FloorRepo = class FloorRepo {
    constructor(floorSchema) {
        this.floorSchema = floorSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async findByDomainId(floorId) {
        const query = { domainId: floorId };
        const floorRecord = await this.floorSchema.findOne(query);
        if (floorRecord != null) {
            return FloorMap_1.FloorMap.toDomain(floorRecord);
        }
        else
            return null;
        -console.log("Floor doesn't exist");
    }
    async exists(floorId) {
        const idx = floorId instanceof floorId_1.FloorId ? floorId.id.toValue() : floorId;
        const query = { domainId: idx };
        const floorDocument = await this.floorSchema.findOne(query);
        return !!floorDocument === true;
    }
    async save(floor) {
        const query = { domainId: floor.id.toString() };
        const floorDocument = await this.floorSchema.findOne(query);
        try {
            if (floorDocument === null) {
                const rawFloor = FloorMap_1.FloorMap.toPersistence(floor);
                const floorCreated = await this.floorSchema.create(rawFloor);
                return FloorMap_1.FloorMap.toDomain(floorCreated);
            }
            else {
                floorDocument.buildingId = floor.buildingId;
                floorDocument.floorNumber = floor.floorNumber;
                floorDocument.description = floor.description;
                await floorDocument.save();
                return floor;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByCode(code) {
        const query = { code: code.toString() };
        const floorRecord = await this.floorSchema.findOne(query);
        if (floorRecord != null) {
            return FloorMap_1.FloorMap.toDomain(floorRecord);
        }
        else
            return null;
    }
    async findById(floorId) {
        const idX = floorId instanceof floorId_1.FloorId ? floorId.id.toValue() : floorId;
        const query = { domainId: idX };
        const floorRecord = await this.floorSchema.findOne(query);
        if (floorRecord != null) {
            return FloorMap_1.FloorMap.toDomain(floorRecord);
        }
        else
            return null;
    }
};
FloorRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('floorSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], FloorRepo);
exports.default = FloorRepo;
//# sourceMappingURL=floorRepo.js.map