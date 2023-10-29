import {Mapper} from "../core/infra/Mapper";
import {Elevator} from "../domain/elevator";
import {IElevatorDTO} from "../dto/IElevatorDTO";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";


export class ElevatorMap extends Mapper<Elevator>{

  public static toDTO(elevator: Elevator): IElevatorDTO {
    return {
      id: elevator.id.toString(),
      building: elevator.building,
      floorList: elevator.floorList,
      brand: elevator.brand,
      model: elevator.model,
      serialNumber: elevator.serialNumber,
      description: elevator.description,
    }as IElevatorDTO

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

  public static async toDomain (raw: any): Promise<Elevator> {

    const elevatorOrError = Elevator.create(
      {
        buildingId: raw.buildingId,
        floorList: raw.floorList,
        brand: raw.brand,
        model: raw.model,
        serialNumber: raw.serialNumber,
        description: raw.description,

      }, new UniqueEntityID(raw.domainId)
    )
    elevatorOrError.isFailure ? console.log(elevatorOrError.error): '';
    return elevatorOrError.isSuccess? elevatorOrError.getValue(): null;
  }

  public static toPersistence(elevator: Elevator): any{
    const a = {
      domainId: elevator.id.toString(),
      building: elevator.building,
      floorList: elevator.floorList,
      brand: elevator.brand,
      model: elevator.model,
      serialNumber: elevator.serialNumber,
      description: elevator.description,
    }
    return a;
  }
}
