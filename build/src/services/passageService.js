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
const PassageMap_1 = require("../mappers/PassageMap");
const passage_1 = require("../domain/passage");
let PassageService = class PassageService {
    constructor(passageRepo, floorRepo) {
        this.passageRepo = passageRepo;
        this.floorRepo = floorRepo;
    }
    async getPassage(passageId) {
        try {
            const passage = await this.passageRepo.findByDomainId(passageId);
            if (passage === null) {
                return Result_1.Result.fail("Passage not found");
            }
            else {
                const passageDTOResult = PassageMap_1.PassageMap.toDTO(passage);
                return Result_1.Result.ok(passageDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createPassage(passageDTO) {
        if (this.isPassage(passageDTO)) {
            try {
                const passageOrError = await passage_1.Passage.create(passageDTO);
                if (passageOrError.isFailure) {
                    return Result_1.Result.fail(passageOrError.errorValue());
                }
                const passageResult = passageOrError.getValue();
                await this.passageRepo.save(passageResult);
                const passageDTOResult = PassageMap_1.PassageMap.toDTO(passageResult);
                return Result_1.Result.ok(passageDTOResult);
            }
            catch (e) {
                throw e;
            }
        }
        else {
            console.log("Passage not valid | Floors are on the same building");
            // You may want to return an error result here instead of using console.log.
            return Result_1.Result.fail("Passage not valid | Floors are on the same building");
        }
    }
    async updatePassage(passageDTO) {
        try {
            const passage = await this.passageRepo.findByDomainId(passageDTO.id);
            if (passage === null) {
                return Result_1.Result.fail("Passage not found");
            }
            else {
                if (passageDTO.toFloorId !== undefined) {
                    passage.props.toFloorId = passageDTO.toFloorId;
                }
                if (passageDTO.fromFloorId !== undefined) {
                    passage.props.fromFloorId = passageDTO.fromFloorId;
                }
                if (passageDTO.description !== undefined) {
                    passage.props.description = passageDTO.description;
                }
                await this.passageRepo.save(passage);
                const passageDTOResult = PassageMap_1.PassageMap.toDTO(passage);
                return Result_1.Result.ok(passageDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async isPassage(passageDTO) {
        const building1 = await this.floorRepo.findByDomainId(passageDTO.fromFloorId);
        const building2 = await this.floorRepo.findByDomainId(passageDTO.toFloorId);
        console.log(this.floorRepo.exists(passageDTO.fromFloorId.toString()));
        console.log(building2 !== null);
        if (this.floorRepo.exists(passageDTO.fromFloorId.toString()) && this.floorRepo.exists(passageDTO.toFloorId.toString())
            && building2 !== null && building2 !== null) {
            if ((!building1.equals(building2)))
                return true;
        }
        return false;
    }
};
PassageService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.passage.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.floor.name)),
    __metadata("design:paramtypes", [Object, Object])
], PassageService);
exports.default = PassageService;
//# sourceMappingURL=passageService.js.map