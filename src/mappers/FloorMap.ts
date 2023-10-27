import {Mapper} from "../core/infra/Mapper";
import {Floor} from "../domain/floor";
import {IFloorDTO} from "../dto/IFloorDTO";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";


export class FloorMap extends Mapper<Floor>{

  public static toDTO(floor: Floor): IFloorDTO {
    return {
      buildingId:floor.buildingId,
      floorNumber:floor.floorNumber,
      description: floor.description,
    }as IFloorDTO

  }

  public static async toDomain (raw: any): Promise<Floor>{

    const floorOrError = Floor.create(
      {
        buildingId: raw.buildingId,
        floorNumber: raw.floorNumber,
        description: raw.description,

      }, new UniqueEntityID(raw.domainId)
    )
    floorOrError.isFailure ? console.log(floorOrError.error): '';
    return floorOrError.isSuccess? floorOrError.getValue(): null;
  }

  public static toPersistence(floor: Floor): any{
    const a = {
      domainId: floor.id.toString(),
      buildingId: floor.buildingId,
      floorNumber: floor.floorNumber,
      description: floor.description,
    }
    return a;
  }
}
