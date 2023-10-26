import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';

import IFloorRepo from "../services/IRepos/IFloorRepo";
import {Floor} from "../domain/floor";
import {FloorId} from "../domain/floorId";
import {FloorMap} from "../mappers/FloorMap";


@Service()
export default class FloorRepo implements IFloorRepo{
  findByDomainId(FloorId: FloorId | string): Promise<Floor> {
    return Promise.resolve(undefined);
  }

  private models: any;

  constructor(
    @Inject('floorSchema') private floorSchema: Model<IFloorPersistence & Document>,

  ){}
  private createBaseQuery(): any{
    return{
      where:{},
    }
  }

  public async exists (floorId: FloorId | string): Promise<boolean>{
    const idx = floorId instanceof FloorId ? (<FloorId>floorId).id.toValue(): floorId;

    const query = {domainId: idx};
    const floorDocument = await this.floorSchema.findOne(query);

    return  !!floorDocument === true;
  }

  public async save (floor: Floor): Promise<Floor>{
    const query = { domainId: floor.id.toString() };

    const floorDocument = await this.floorSchema.findOne( query );

    try {
      if (floorDocument === null ) {
        const rawFloor: any = FloorMap.toPersistence(floor);

        const floorCreated = await this.floorSchema.create(rawFloor);

        return FloorMap.toDomain(floorCreated);
      } else {

        floorDocument.buildingId= floor.buildingId;
        floorDocument.description = floor.description;
        await floorDocument.save();

        return floor;
      }
    } catch (err) {
      throw err;
    }
  }


  async findByCode(code: string): Promise<Floor> {
    const query = {code: code.toString()};
    const floorRecord = await this.floorSchema.findOne(query);

    if (floorRecord != null) {
      return FloorMap.toDomain(floorRecord);
    } else return null;
  }

  async findById(floorId: FloorId | string): Promise<Floor> {

    const idX = floorId instanceof FloorId ? (<FloorId>floorId).id.toValue() : floorId;

    const query = {domainId: idX};
    const floorRecord = await this.floorSchema.findOne(query);

    if (floorRecord != null) {
      return FloorMap.toDomain(floorRecord);
    } else
      return null;

  }

}


