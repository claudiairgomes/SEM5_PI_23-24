"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevatorMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const elevator_1 = require("../domain/elevator");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class ElevatorMap extends Mapper_1.Mapper {
    static toDTO(elevator) {
        return {
            id: elevator.id.toString(),
            building: elevator.building,
            floorList: elevator.floorList,
            brand: elevator.brand,
            model: elevator.model,
            serialNumber: elevator.serialNumber,
            description: elevator.description,
        };
    }
    /*  public static toDTObeta(elevator: Elevator): IElevatorDTObeta {
        return {
          id: elevator.id.toString(),
          building: elevator.building,
          floorList: elevator.floorList,
          brand: elevator.brand,
          model: elevator.model,
          serialNumber: elevator.serialNumber,
          description: elevator.description,
        }as IElevatorDTObeta
    
      }
    
     */
    static async toDomain(raw) {
        const elevatorOrError = elevator_1.Elevator.create({
            building: raw.building,
            floorList: raw.floorList,
            brand: raw.brand,
            model: raw.model,
            serialNumber: raw.serialNumber,
            description: raw.description,
        }, new UniqueEntityID_1.UniqueEntityID(raw.domainId));
        elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';
        return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
    }
    static toPersistence(elevator) {
        const a = {
            domainId: elevator.id.toString(),
            building: elevator.building,
            floorList: elevator.floorList,
            brand: elevator.brand,
            model: elevator.model,
            serialNumber: elevator.serialNumber,
            description: elevator.description,
        };
        return a;
    }
}
exports.ElevatorMap = ElevatorMap;
//# sourceMappingURL=ElevatorMap.js.map