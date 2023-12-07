import { Service, Inject } from 'typedi';

import {Document, FilterQuery, Model} from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';

import IRoomRepo from "../services/IRepos/IRoomRepo";
import {Room} from "../domain/room";
import {RoomId} from "../domain/roomId";
import {RoomMap} from "../mappers/RoomMap";

@Service()
export default class RoomRepo implements IRoomRepo{

  /*  public async findByDomainId (roleId: RoleId | string): Promise<Role> {
    const query = { domainId: roleId};
    const roleRecord = await this.roleSchema.findOne( query as FilterQuery<IRolePersistence & Document> );

    if( roleRecord != null) {
      return RoleMap.toDomain(roleRecord);
    }
    else
      return null;
  }*/

private models: any;

constructor(
  @Inject('roomSchema') private roomSchema: Model<IRoomPersistence & Document>,
  @Inject('floorSchema')private floorSchema: Model<IRoomPersistence & Document>,

){}
  private createBaseQuery(): any{
  return{
    where:{},
  }
  }

  public async exists (roomId: RoomId | string): Promise<boolean>{
  const idx = roomId instanceof RoomId ? (<RoomId>roomId).id.toValue(): roomId;

  const query = {domainId: idx};
  const roomDocument = await this.roomSchema.findOne(query);

  return  !!roomDocument === true;
  }

  public async save (room: Room): Promise<Room>{
    const query = { domainId: room.id.toString() };

    const roomDocument = await this.roomSchema.findOne( query );

    try {
      if (roomDocument === null ) {
        const rawRoom: any = RoomMap.toPersistence(room);

        const roomCreated = await this.roomSchema.create(rawRoom);

        return RoomMap.toDomain(roomCreated);
      } else {

        roomDocument.name= room.name;
        roomDocument.description = room.description;
        roomDocument.dimension= room.dimension;
        roomDocument.code= room.code;
        roomDocument.floorId=room.floorId;
        await roomDocument.save();

        return room;
      }
    } catch (err) {
      throw err;
    }
  }


  public async findByCode(code: string): Promise<Room> {
    const query = {code: code.toString()};
    const roomRecord = await this.roomSchema.findOne(query);



    if (roomRecord != null) {
      return RoomMap.toDomain(roomRecord);
    } else return null;
  }

  /*async findById(roomId: roomId | string): Promise<room> {

    const idX = roomId instanceof roomId ? (<roomId>roomId).id.toValue() : roomId;

    const query = {domainId: idX};
    const roomRecord = await this.roomSchema.findOne(query);

    if (roomRecord != null) {
      return roomMap.toDomain(roomRecord);
    } else
      return null;

  }

   */

  async findByDomainId(roomId: RoomId | string): Promise<Room> {

    const query = { domainId: roomId};
    const roomRecord = await this.roomSchema.findOne( query as FilterQuery<IRoomPersistence & Document> );

    if( roomRecord != null) {

      return RoomMap.toDomain(roomRecord);
    }
    else
      return null;
    console.log("Room doesn't exist");
  }


  public async findAll(){
  try{
    //const roomRecords = await this.roomSchema.find();
    return await this.roomSchema.find();
  }catch (e){
    throw e;
  }

    //return roomRecords.map((record) => RoomMap.toDomain(record));
  }

  async findRoomsByFloorRange(minFloors: number, maxFloors: number) {
    // Implement the logic to find rooms based on the floor range
    // For example, if you have a floorModel with a floorNumber field, you can use the aggregation framework

    return this.roomSchema.aggregate([
      {
        $lookup: {
          from: "floors",
          localField: "_id",
          foreignField: "roomId",
          as: "floors",
        },
      },
      {
        $match: {
          "floors.floorNumber": { $gte: minFloors, $lte: maxFloors },
        },
      },
    ]).exec();
  }
}




