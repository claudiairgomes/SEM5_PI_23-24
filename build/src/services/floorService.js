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
const floor_1 = require("../domain/floor");
const FloorMap_1 = require("../mappers/FloorMap");
let FloorService = class FloorService {
    constructor(floorRepo) {
        this.floorRepo = floorRepo;
    }
    async getFloor(floorId) {
        try {
            const floor = await this.floorRepo.findByDomainId(floorId);
            if (floor === null) {
                return Result_1.Result.fail("Floor not found");
            }
            else {
                const roleDTOResult = FloorMap_1.FloorMap.toDTO(floor);
                return Result_1.Result.ok(roleDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createFloor(floorDTO) {
        try {
            const floorOrError = await floor_1.Floor.create(floorDTO);
            if (floorOrError.isFailure) {
                return Result_1.Result.fail(floorOrError.errorValue());
            }
            const floorResult = floorOrError.getValue();
            await this.floorRepo.save(floorResult);
            const floorDTOResult = FloorMap_1.FloorMap.toDTO(floorResult);
            return Result_1.Result.ok(floorDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    /*  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
    
          const floor = await this.floorRepo.findByDomainId(floorDTO.id);
    
    
          if (floor === null) {
            return Result.fail<IFloorDTO>("Floor not found");
          }
          else {
            floor.props.buildingId = floorDTO.buildingId;
            floor.props.floorNumber = floorDTO.floorNumber;
            floor.props.description = floorDTO.description;
            await this.floorRepo.save(floor);
    
            const floorDTOResult = FloorMap.toDTO( floor ) as IFloorDTO;
            return Result.ok<IFloorDTO>( floorDTOResult )
          }
        } catch (e) {
          throw e;
        }
      }
    
     */
    async updateFloor(floorDTO) {
        try {
            const floor = await this.floorRepo.findByDomainId(floorDTO.id);
            if (!floor) {
                return Result_1.Result.fail("Floor not found");
            }
            else {
                // Check which fields are present in the request and update them
                if (floorDTO.buildingId !== undefined) {
                    floor.props.buildingId = floorDTO.buildingId;
                }
                if (floorDTO.floorNumber !== undefined) {
                    floor.props.floorNumber = floorDTO.floorNumber;
                }
                if (floorDTO.description !== undefined) {
                    floor.props.description = floorDTO.description;
                }
                await this.floorRepo.save(floor);
                const floorDTOResult = FloorMap_1.FloorMap.toDTO(floor);
                return Result_1.Result.ok(floorDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
};
FloorService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.floor.name)),
    __metadata("design:paramtypes", [Object])
], FloorService);
exports.default = FloorService;
//# sourceMappingURL=floorService.js.map