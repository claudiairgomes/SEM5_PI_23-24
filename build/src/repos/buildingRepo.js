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
const buildingId_1 = require("../domain/buildingId");
const BuildingMap_1 = require("../mappers/BuildingMap");
let BuildingRepo = class BuildingRepo {
    constructor(buildingSchema) {
        this.buildingSchema = buildingSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(buildingId) {
        const idx = buildingId instanceof buildingId_1.BuildingId ? buildingId.id.toValue() : buildingId;
        const query = { domainId: idx };
        const buildingDocument = await this.buildingSchema.findOne(query);
        return !!buildingDocument === true;
    }
    async save(building) {
        const query = { domainId: building.id.toString() };
        const buildingDocument = await this.buildingSchema.findOne(query);
        try {
            if (buildingDocument === null) {
                const rawBuilding = BuildingMap_1.BuildingMap.toPersistence(building);
                const buildingCreated = await this.buildingSchema.create(rawBuilding);
                return BuildingMap_1.BuildingMap.toDomain(buildingCreated);
            }
            else {
                buildingDocument.name = building.name;
                buildingDocument.description = building.description;
                buildingDocument.dimension = building.dimension;
                buildingDocument.code = building.code;
                await buildingDocument.save();
                return building;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByCode(code) {
        const query = { code: code.toString() };
        const buildingRecord = await this.buildingSchema.findOne(query);
        if (buildingRecord != null) {
            return BuildingMap_1.BuildingMap.toDomain(buildingRecord);
        }
        else
            return null;
    }
    /*async findById(buildingId: BuildingId | string): Promise<Building> {
  
      const idX = buildingId instanceof BuildingId ? (<BuildingId>buildingId).id.toValue() : buildingId;
  
      const query = {domainId: idX};
      const buildingRecord = await this.buildingSchema.findOne(query);
  
      if (buildingRecord != null) {
        return BuildingMap.toDomain(buildingRecord);
      } else
        return null;
  
    }
  
     */
    async findByDomainId(buildingId) {
        const query = { domainId: buildingId };
        const buildingRecord = await this.buildingSchema.findOne(query);
        if (buildingRecord != null) {
            return BuildingMap_1.BuildingMap.toDomain(buildingRecord);
        }
        else
            return null;
        console.log("Building doesn't exist");
    }
    async findAll() {
        try {
            //const buildingRecords = await this.buildingSchema.find();
            return await this.buildingSchema.find();
        }
        catch (e) {
            throw e;
        }
        //return buildingRecords.map((record) => BuildingMap.toDomain(record));
    }
};
BuildingRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('buildingSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BuildingRepo);
exports.default = BuildingRepo;
//# sourceMappingURL=buildingRepo.js.map