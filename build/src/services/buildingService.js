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
const Result_1 = require("../core/logic/Result");
const config_1 = __importDefault(require("../../config"));
const building_1 = require("../domain/building");
const BuildingMap_1 = require("../mappers/BuildingMap");
let BuildingService = class BuildingService {
    constructor(buildingRepo) {
        this.buildingRepo = buildingRepo;
    }
    async getBuilding(buildingId) {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingId);
            if (building === null) {
                return Result_1.Result.fail("Building not found");
            }
            else {
                const roleDTOResult = BuildingMap_1.BuildingMap.toDTO(building);
                return Result_1.Result.ok(roleDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createBuilding(buildingDTO) {
        try {
            const buildingOrError = await building_1.Building.create(buildingDTO);
            if (buildingOrError.isFailure) {
                return Result_1.Result.fail(buildingOrError.errorValue());
            }
            const buildingResult = buildingOrError.getValue();
            await this.buildingRepo.save(buildingResult);
            const buildingDTOResult = BuildingMap_1.BuildingMap.toDTO(buildingResult);
            return Result_1.Result.ok(buildingDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updateBuilding(buildingDTO) {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingDTO.id);
            // const floor = await this.floorRepo.findByDomainId(floorDTO.id);
            if (building === null) {
                return Result_1.Result.fail("Building not found");
            }
            else {
                // Check which fields are present in the request and update them
                if (buildingDTO.name !== undefined) {
                    building.props.name = buildingDTO.name;
                }
                if (buildingDTO.description !== undefined) {
                    building.props.description = buildingDTO.description;
                }
                if (buildingDTO.dimension !== undefined) {
                    building.props.dimension = buildingDTO.dimension;
                }
                if (buildingDTO.code !== undefined) {
                    building.props.code = buildingDTO.code;
                }
                await this.buildingRepo.save(building);
                const buildingDTOResult = BuildingMap_1.BuildingMap.toDTO(building);
                return Result_1.Result.ok(buildingDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getAllBuildings() {
        try {
            // Implement the logic to retrieve a list of all buildings from your data source
            // For example, if you have a BuildingRepository, you can call a method like getAllBuildings from there
            const buildings = await this.buildingRepo.findAll();
            // Return the list of building DTOs
            return Result_1.Result.ok(buildings);
        }
        catch (error) {
            // Handle any errors, log them, and return a Result indicating failure
            console.error('Error while fetching buildings:', error);
            return Result_1.Result.fail('Failed to fetch buildings');
        }
    }
};
BuildingService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.building.name)),
    __metadata("design:paramtypes", [Object])
], BuildingService);
exports.default = BuildingService;
//# sourceMappingURL=buildingService.js.map