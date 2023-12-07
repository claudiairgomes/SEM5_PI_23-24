import {Room} from "../../domain/room";
import {Repo} from "../../core/infra/Repo";
import {RoomId} from "../../domain/roomId";

export default interface IRoomRepo extends Repo<Room>{
  save (room:Room): Promise <Room>;
  //findById(id:string): Promise<Room>;

  findByCode(code:string): Promise<Room>

  findByDomainId (roomId: RoomId | string): Promise<Room>;

  findAll();

  exists(roomId: RoomId | string): Promise<boolean>;

  findRoomsByFloorRange(minFloors: number, maxFloors: number) ;
}
