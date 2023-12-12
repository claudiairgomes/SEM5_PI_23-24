import {IRoomDTO} from "../../dto/IRoomDTO";
import {Result} from "../../core/logic/Result";
import { Room } from "../../domain/room";


export default interface IRoomService{
  createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  getAllRooms():Promise<Result<IRoomDTO>> ;
  getRoomById(roomId:string):Promise<Result<IRoomDTO>>;

}
