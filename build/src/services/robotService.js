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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const robot_1 = require("../domain/robot");
const Result_1 = require("../core/logic/Result");
const RobotMap_1 = require("../mappers/RobotMap");
let RobotService = class RobotService {
    constructor(robotRepo) {
        this.robotRepo = robotRepo;
    }
    async getRobot(robotId) {
        try {
            const robot = await this.robotRepo.findByDomainId(robotId);
            if (robot === null) {
                return Result_1.Result.fail("Robot not found");
            }
            else {
                const robotDTOResult = RobotMap_1.RobotMap.toDTO(robot);
                return Result_1.Result.ok(robotDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createRobot(robotDTO) {
        try {
            const robotOrError = await robot_1.Robot.create({ codRobot: robotDTO.codRobot, nickname: robotDTO.nickname, type: robotDTO.type, serialNumber: robotDTO.serialNumber, description: robotDTO.description == null ? '' : robotDTO.description });
            if (robotOrError.isFailure) {
                return Result_1.Result.fail(robotOrError.errorValue());
            }
            const robotResult = robotOrError.getValue();
            await this.robotRepo.save(robotResult);
            const robotDTOResult = RobotMap_1.RobotMap.toDTO(robotResult);
            return Result_1.Result.ok(robotDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
};
RobotService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.robot.name)),
    __metadata("design:paramtypes", [Object])
], RobotService);
exports.default = RobotService;
//# sourceMappingURL=robotService.js.map