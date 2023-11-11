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
const elevatorId_1 = require("../domain/elevatorId");
const ElevatorMap_1 = require("../mappers/ElevatorMap");
let ElevatorRepo = class ElevatorRepo {
    constructor(elevatorSchema) {
        this.elevatorSchema = elevatorSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(elevatorId) {
        const idx = elevatorId instanceof elevatorId_1.ElevatorId ? elevatorId.id.toValue() : elevatorId;
        const query = { domainId: idx };
        const elevatorDocument = await this.elevatorSchema.findOne(query);
        return !!elevatorDocument === true;
    }
    async save(elevator) {
        const query = { domainId: elevator.id.toString() };
        const elevatorDocument = await this.elevatorSchema.findOne(query);
        try {
            if (elevatorDocument === null) {
                const rawElevator = ElevatorMap_1.ElevatorMap.toPersistence(elevator);
                const elevatorCreated = await this.elevatorSchema.create(rawElevator);
                return ElevatorMap_1.ElevatorMap.toDomain(elevatorCreated);
            }
            else {
                elevatorDocument.building = elevator.building;
                elevatorDocument.floorList = elevator.floorList;
                elevatorDocument.brand = elevator.brand;
                //model nao corresponde
                elevatorDocument.baseModelName = elevator.model;
                elevatorDocument.serialNumber = elevator.serialNumber;
                elevatorDocument.description = elevator.description;
                await elevatorDocument.save();
                return elevator;
            }
        }
        catch (err) {
            throw err;
        }
    }
    findByDomainId(elevatorId) {
        const query = { domainId: elevatorId };
        const elevatorRecord = this.elevatorSchema.findOne(query);
        if (elevatorRecord != null) {
            return ElevatorMap_1.ElevatorMap.toDomain(elevatorRecord);
        }
        else
            return null;
        console.log("Elevator doesn't exist");
    }
    async findAll() {
        try {
            //const buildingRecords = await this.buildingSchema.find();
            return await this.elevatorSchema.find();
        }
        catch (e) {
            throw e;
        }
        //return buildingRecords.map((record) => BuildingMap.toDomain(record));
    }
};
ElevatorRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('elevatorSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ElevatorRepo);
exports.default = ElevatorRepo;
//# sourceMappingURL=elevatorRepo.js.map