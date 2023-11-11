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
const ElevatorMap_1 = require("../mappers/ElevatorMap");
const elevator_1 = require("../domain/elevator");
let ElevatorService = class ElevatorService {
    constructor(elevatorRepo, floorRepo, buildingRepo) {
        this.elevatorRepo = elevatorRepo;
        this.floorRepo = floorRepo;
        this.buildingRepo = buildingRepo;
    }
    async getBuilding(elevatorId) {
        try {
            const elevator = await this.elevatorRepo.findByDomainId(elevatorId);
            if (elevator === null) {
                return Result_1.Result.fail("Building not found");
            }
            else {
                const elevatorDTOResult = ElevatorMap_1.ElevatorMap.toDTO(elevator);
                return Result_1.Result.ok(elevatorDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    /*public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
      try {
  
        //const elevatorDTO: IElevatorDTO = await this.turnDTObetaToDTO(elevatorDTObeta);
  
        elevatorDTO.floorList.forEach((floorId) => {
  
          // `floorId` is a string representing the ID of a floor
          // You can perform actions with each `floorId` here
        });
        const elevatorOrError = await Elevator.create( elevatorDTO );
  
        if (elevatorOrError.isFailure) {
          return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
        }
  
        const elevatorResult = elevatorOrError.getValue();
  
        await this.elevatorRepo.save(elevatorResult);
  
        const elevatorDTOResult = ElevatorMap.toDTO( elevatorResult ) as IElevatorDTO;
        return Result.ok<IElevatorDTO>( elevatorDTOResult )
      } catch (e) {
        throw e;
      }
    }
  
     */
    async createElevator(elevatorDTO) {
        try {
            /*const building: Building = await this.buildingRepo.findByDomainId(elevatorDTO.building);
            const floorList: Array<Floor> = new Array<Floor>();
      
            elevatorDTO.building = building;
      
            for (const floorId of elevatorDTO.floorList) {
              // Fetch the Floor object based on the floorId
              const floor = await this.floorRepo.findByDomainId(floorId);
      
      
              if (!floor) {
                // Handle the case where the floor doesn't exist or is not found
                // You can return an error or take appropriate action
                return Result.fail<IElevatorDTO>("Floor not found for ID: " + floorId.id);
              }
      
              floorList.push(floor);
            }
      
            // Replace the floor IDs with the actual Floor objects in elevatorDTO
            elevatorDTO.floorList = floorList;*/
            const elevatorOrError = await elevator_1.Elevator.create(elevatorDTO);
            if (elevatorOrError.isFailure) {
                return Result_1.Result.fail(elevatorOrError.errorValue());
            }
            const elevatorResult = elevatorOrError.getValue();
            await this.elevatorRepo.save(elevatorResult);
            const elevatorDTOResult = ElevatorMap_1.ElevatorMap.toDTO(elevatorResult);
            return Result_1.Result.ok(elevatorDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updateElevator(elevatorDTO) {
        try {
            const elevator = await this.elevatorRepo.findByDomainId(elevatorDTO.id);
            if (elevator === null) {
                return Result_1.Result.fail("Building not found");
            }
            else {
                elevator.props.building = elevatorDTO.building;
                elevator.props.floorList = elevatorDTO.floorList;
                elevator.props.brand = elevatorDTO.brand;
                elevator.props.model = elevatorDTO.model;
                elevator.props.serialNumber = elevatorDTO.serialNumber;
                elevator.props.description = elevatorDTO.description;
                await this.elevatorRepo.save(elevator);
                const buildingDTOResult = ElevatorMap_1.ElevatorMap.toDTO(elevator);
                return Result_1.Result.ok(buildingDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getAllElevators() {
        try {
            // Implement the logic to retrieve a list of all buildings from your data source
            // For example, if you have a BuildingRepository, you can call a method like getAllBuildings from there
            const elevators = await this.elevatorRepo.findAll();
            // Return the list of building DTOs
            return Result_1.Result.ok(elevators);
        }
        catch (error) {
            // Handle any errors, log them, and return a Result indicating failure
            console.error('Error while fetching elevators:', error);
            return Result_1.Result.fail('Failed to fetch elevators');
        }
    }
    async getFloorsByIds(floorIds) {
        // Implements the logic to query the database and retrieve floors based on the provided IDs
        const newFloorList = new Array();
        try {
            for (let floorId of floorIds) {
                newFloorList.push(await this.floorRepo.findByDomainId(floorId));
            }
        }
        catch (e) {
            throw e;
        }
        // Returns an array of Floor objects
        return newFloorList;
    }
    async associateFloorsWithElevator(elevator, floorIds) {
        // Use the getFloorsByIds method to fetch the Floor objects based on the provided IDs
        const floors = await this.getFloorsByIds(floorIds);
        // Assuming that 'elevator' has a property 'floors' to store the list of floors
        // Set the 'floors' property of the 'elevator' to the fetched 'floors'
        // elevator.setFloorList(floors);
        // Save the updated 'elevator' to your data source (e.g., a database) if necessary
        return elevator;
    }
};
ElevatorService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.elevator.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.floor.name)),
    __param(2, (0, typedi_1.Inject)(config_1.default.repos.building.name)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ElevatorService);
exports.default = ElevatorService;
//# sourceMappingURL=elevatorService.js.map