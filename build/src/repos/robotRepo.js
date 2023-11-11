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
const robotId_1 = require("../domain/robotId");
const RobotMap_1 = require("../mappers/RobotMap");
let RobotRepo = class RobotRepo {
    constructor(RobotSchema) {
        this.RobotSchema = RobotSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(robotId) {
        const idX = robotId instanceof robotId_1.RobotId ? robotId.id.toValue() : robotId;
        const query = { domainId: idX };
        const robotDocument = await this.RobotSchema.findOne(query);
        return !!robotDocument === true;
    }
    async save(robot) {
        const query = { domainId: robot.id.toString() };
        const robotDocument = await this.RobotSchema.findOne(query);
        try {
            if (robotDocument === null) {
                const rawRobot = RobotMap_1.RobotMap.toPersistence(robot);
                const robotCreated = await this.RobotSchema.create(rawRobot);
                return RobotMap_1.RobotMap.toDomain(robotCreated);
            }
            else {
                robotDocument.nickname = robot.nickname;
                robotDocument.codRobot = robot.codRobot;
                await robotDocument.save();
                return robot;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findById(robotId) {
        const idX = robotId_1.RobotId instanceof robotId_1.RobotId ? robotId.id.toValue() : robotId_1.RobotId;
        const query = { domainId: idX };
        const RobotRecord = await this.RobotSchema.findOne(query);
        if (RobotRecord != null) {
            return RobotMap_1.RobotMap.toDomain(RobotRecord);
        }
        else
            return null;
    }
    findByDomainId(robotId) {
        return Promise.resolve(undefined);
    }
};
RobotRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('robotSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], RobotRepo);
exports.default = RobotRepo;
//# sourceMappingURL=robotRepo.js.map