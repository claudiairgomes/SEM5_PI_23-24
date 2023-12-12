import {Inject, Service} from "typedi";
import IRoomService from "./IServices/IRoomService";
import {IRoomDTO} from "../dto/IRoomDTO";
import {Result} from "../core/logic/Result";
import config from "../../config";


import IRoomRepo from "./IRepos/IRoomRepo";
import {Room} from "../domain/room";
import {RoomMap} from "../mappers/RoomMap";
import IFloorRepo from "./IRepos/IFloorRepo";


@Service()
export default class RoomService implements IRoomService{

  constructor(
    @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,

  ) {}


  public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
    try {

      const roomOrError = await Room.create( roomDTO );

      if (roomOrError.isFailure) {
        return Result.fail<IRoomDTO>(roomOrError.errorValue());
      }

      const roomResult = roomOrError.getValue();

      await this.roomRepo.save(roomResult);

      const roomDTOResult = RoomMap.toDTO( roomResult ) as IRoomDTO;
      return Result.ok<IRoomDTO>( roomDTOResult )
    } catch (e) {
      throw e;
    }
  }


  public async updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {


    try {
      const room = await this.roomRepo.findByDomainId(roomDTO.id);
      // const floor = await this.floorRepo.findByDomainId(floorDTO.id);

      if (room === null) {
        return Result.fail<IRoomDTO>("Room not found");
      }
      else {
        // Check which fields are present in the request and update them
        if(roomDTO.name!== undefined){
          room.props.name = roomDTO.name;
        }
        if (roomDTO.description!==undefined){
          room.props.description  = roomDTO.description;
        }
        if (roomDTO.dimension!==undefined){
          room.props.dimension = roomDTO.dimension;
        }
        if (roomDTO.code!==undefined){
          room.props.code = roomDTO.code;
        }
        if (roomDTO.floor!==undefined){
          room.props.floor = roomDTO.floor;
        }
        await this.roomRepo.save(room);

        const roomDTOResult = RoomMap.toDTO( room ) as IRoomDTO;
        return Result.ok<IRoomDTO>( roomDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }


  public async getAllRooms() :Promise<Result<IRoomDTO>>{
    try {
      // Implement the logic to retrieve a list of all rooms from your data source
      // For example, if you have a RoomRepository, you can call a method like getAllRooms from there

      const rooms = await this.roomRepo.findAll();

      // Return the list of room DTOs
      return rooms;
    } catch (error) {
      // Handle any errors, log them, and return a Result indicating failure
      console.error('Error while fetching rooms:', error);
      return Result.fail('Failed to fetch rooms');
    }
  }

  public async getRoomById( roomId: string): Promise<Result<IRoomDTO>> {
    try {
      const room = await this.roomRepo.findByDomainId(roomId);

      if (room === null) {
        return Result.fail<IRoomDTO>("Room not found");
      }
      else {
        const roleDTOResult = RoomMap.toDTO( room ) as IRoomDTO;
        return Result.ok<IRoomDTO>( roleDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }


}
