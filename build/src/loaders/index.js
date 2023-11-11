"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const mongoose_1 = __importDefault(require("./mongoose"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("../../config"));
exports.default = async ({ expressApp }) => {
    const mongoConnection = await (0, mongoose_1.default)();
    logger_1.default.info('✌️ DB loaded and connected!');
    const userSchema = {
        // compare with the approach followed in repos and services
        name: 'userSchema',
        schema: '../persistence/schemas/userSchema',
    };
    const roleSchema = {
        // compare with the approach followed in repos and services
        name: 'roleSchema',
        schema: '../persistence/schemas/roleSchema',
    };
    const buildingSchema = {
        // compare with the approach followed in repos and services
        name: 'buildingSchema',
        schema: '../persistence/schemas/buildingSchema',
    };
    const elevatorSchema = {
        // compare with the approach followed in repos and services
        name: 'elevatorSchema',
        schema: '../persistence/schemas/elevatorSchema',
    };
    const floorSchema = {
        name: 'floorSchema',
        schema: '../persistence/schemas/floorSchema',
    };
    const robotSchema = {
        name: 'robotSchema',
        schema: '../persistence/schemas/robotSchema',
    };
    const passageSchema = {
        name: 'passageSchema',
        schema: '../persistence/schemas/passageSchema',
    };
    const roleController = {
        name: config_1.default.controllers.role.name,
        path: config_1.default.controllers.role.path
    };
    const buildingController = {
        name: config_1.default.controllers.building.name,
        path: config_1.default.controllers.building.path
    };
    const elevatorController = {
        name: config_1.default.controllers.elevator.name,
        path: config_1.default.controllers.elevator.path
    };
    const floorController = {
        name: config_1.default.controllers.floor.name,
        path: config_1.default.controllers.floor.path
    };
    const robotController = {
        name: config_1.default.controllers.robot.name,
        path: config_1.default.controllers.robot.path
    };
    const passageController = {
        name: config_1.default.controllers.passage.name,
        path: config_1.default.controllers.passage.path
    };
    const roleRepo = {
        name: config_1.default.repos.role.name,
        path: config_1.default.repos.role.path
    };
    const userRepo = {
        name: config_1.default.repos.user.name,
        path: config_1.default.repos.user.path
    };
    const buildingRepo = {
        name: config_1.default.repos.building.name,
        path: config_1.default.repos.building.path
    };
    const floorRepo = {
        name: config_1.default.repos.floor.name,
        path: config_1.default.repos.floor.path
    };
    const robotRepo = {
        name: config_1.default.repos.robot.name,
        path: config_1.default.repos.robot.path
    };
    const elevatorRepo = {
        name: config_1.default.repos.elevator.name,
        path: config_1.default.repos.elevator.path
    };
    const passageRepo = {
        name: config_1.default.repos.passage.name,
        path: config_1.default.repos.passage.path
    };
    const roleService = {
        name: config_1.default.services.role.name,
        path: config_1.default.services.role.path
    };
    const buildingService = {
        name: config_1.default.services.building.name,
        path: config_1.default.services.building.path
    };
    const elevatorService = {
        name: config_1.default.services.elevator.name,
        path: config_1.default.services.elevator.path
    };
    const floorService = {
        name: config_1.default.services.floor.name,
        path: config_1.default.services.floor.path
    };
    const robotService = {
        name: config_1.default.services.robot.name,
        path: config_1.default.services.robot.path
    };
    const passageService = {
        name: config_1.default.services.passage.name,
        path: config_1.default.services.passage.path
    };
    await (0, dependencyInjector_1.default)({
        mongoConnection,
        schemas: [
            userSchema,
            roleSchema,
            buildingSchema,
            elevatorSchema,
            floorSchema,
            robotSchema,
            passageSchema
        ],
        controllers: [
            roleController,
            buildingController,
            elevatorController,
            floorController,
            robotController,
            passageController
        ],
        repos: [
            roleRepo,
            userRepo,
            buildingRepo,
            elevatorRepo,
            floorRepo,
            robotRepo,
            passageRepo
        ],
        services: [
            roleService,
            buildingService,
            elevatorService,
            floorService,
            robotService,
            passageService
        ]
    });
    logger_1.default.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');
    await (0, express_1.default)({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=index.js.map