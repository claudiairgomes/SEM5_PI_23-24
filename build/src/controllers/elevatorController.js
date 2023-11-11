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
let ElevatorController = class ElevatorController {
    constructor(elevatorServiceInstance) {
        this.elevatorServiceInstance = elevatorServiceInstance;
    }
    /*async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingDTO = req.body as IBuildingDTO;
  
      // Extract the 'floorIds' from the request body
      const { floorIds } = req.body;
  
      // Create the building based on the 'buildingDTO'
      const building = BuildingMap.toDomain(buildingDTO);
  
      // Associate the floors with the building
      await this.buildingServiceInstance.associateFloorsWithBuilding(building, floorIds);
  
      // Save the building to your data source
  
      return res.status(201).json(buildingDTO);
    } catch (error) {
      return next(error);
    }
  }*/
    async createElevator(req, res, next) {
        try {
            const elevatorOrError = await this.elevatorServiceInstance.createElevator(req.body);
            if (elevatorOrError.isFailure) {
                return res.status(402).send();
            }
            const elevatorDTO = elevatorOrError.getValue();
            return res.json(elevatorDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async updateElevator(req, res, next) {
        try {
            const elevatorOrError = await this.elevatorServiceInstance.updateElevator(req.body);
            if (elevatorOrError.isFailure) {
                return res.status(404).send();
            }
            const elevatorDTO = elevatorOrError.getValue();
            return res.status(201).json(elevatorDTO);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    /*  public async getBuildings(req: Request, res: Response, next: NextFunction){
  
  
        const buildings = await BuildingService.getAllBuildings();
  
        // Send the buildings as a response
        res.json(buildings);
  
      }
  
     */
    async getElevators(req, res, next) {
        try {
            const elevators = await this.elevatorServiceInstance.getAllElevators();
            if (!elevators || elevators.length === 0) {
                // Return an appropriate response if there are no elevators
                return res.status(404).json({ message: 'No elevators found' });
            }
            return res.status(200).json(elevators);
        }
        catch (error) {
            // Handle any errors that may occur during the process
            console.error('Error while fetching buildings:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};
ElevatorController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.elevator.name)),
    __metadata("design:paramtypes", [Object])
], ElevatorController);
exports.default = ElevatorController;
//# sourceMappingURL=elevatorController.js.map