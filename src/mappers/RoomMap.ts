import {Mapper} from "../core/infra/Mapper";
import {Room} from "../domain/room";
import {IRoomDTO} from "../dto/IRoomDTO";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";


export class RoomMap extends Mapper<Room>{

  public static toDTO(room: Room): IRoomDTO {
    return {
      id: room.id.toString(),
      name: room.name,
      description: room.description,
      dimension: room.dimension,
      code: room.code,
      floor:room.floor,
    }as IRoomDTO

  }

  public static async toDomain (raw: any): Promise<Room>{

    const roomOrError = Room.create(
      {
        name: raw.name,
        description: raw.description,
        dimension: raw.dimension,
        code: raw.code,
        floor: raw.floor,
      }, new UniqueEntityID(raw.domainId)
    )
    roomOrError.isFailure ? console.log(roomOrError.error): '';
    return roomOrError.isSuccess? roomOrError.getValue(): null;
  }

  public static toPersistence(room: Room): any{
    const a = {
      domainId: room.id.toString(),
      name: room.name,
      description: room.description,
      dimension: room.dimension,
      code: room.code,
      floor: room.floor,
    }
    return a;
  }
}
