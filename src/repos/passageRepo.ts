import { Service, Inject } from 'typedi';

import {Document, FilterQuery, Model} from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';

import IFloorRepo from "../services/IRepos/IFloorRepo";
import {Floor} from "../domain/floor";
import {FloorId} from "../domain/floorId";
import {FloorMap} from "../mappers/FloorMap";
import IPassageRepo from "../services/IRepos/IPassageRepo";
import {PassageId} from "../domain/passageId";
import {IPassagePersistence} from "../dataschema/IPassagePersistence";
import {Passage} from "../domain/passage";
import {PassageMap} from "../mappers/PassageMap";


@Service()
export default class PassageRepo implements IPassageRepo{


  private models: any;

  constructor(
    @Inject('passageSchema') private passageSchema: Model<IPassagePersistence & Document>,

  ){}
  private createBaseQuery(): any{
    return{
      where:{},
    }
  }


  public async findAll() {
    try {
      //const passageRecords = await this.passageSchema.find();
      return await this.passageSchema.find();
    } catch (e) {
      throw e;
    }
  }

  public async findByDomainId(passageId: PassageId | string): Promise<Passage> {
    const query = { domainId: passageId};
    const passageRecord = await this.passageSchema.findOne( query as FilterQuery<IPassagePersistence & Document> );


    if( passageRecord != null) {

      return PassageMap.toDomain(passageRecord);
    }
    else
      return null;-
    console.log("Passage doesn't exist");
  }

  public async exists (passageId: PassageId | string): Promise<boolean>{
    const idx = passageId instanceof FloorId ? (<PassageId>passageId).id.toValue(): passageId;

    const query = {domainId: idx};
    const passageDocument = await this.passageSchema.findOne(query);

    return  !!passageDocument === true;
  }

  public async save (passage: Passage): Promise<Passage>{
    const query = { domainId: passage.id.toString() };

    const passageDocument = await this.passageSchema.findOne( query );

    try {
      if (passageDocument === null ) {
        const rawPassage: any = PassageMap.toPersistence(passage);

        const passageCreated = await this.passageSchema.create(rawPassage);

        return PassageMap.toDomain(passageCreated);
      } else {
        passageDocument.name = passage.name;
        passageDocument.fromFloor = passage.fromFloor;
        passageDocument.toFloor = passage.toFloor;
        passageDocument.description = passage.description;

        await passageDocument.save();

        return passage;
      }
    } catch (err) {
      throw err;
    }
  }



 /* async findById(floorId: FloorId | string): Promise<Floor> {

    const idX = floorId instanceof FloorId ? (<FloorId>floorId).id.toValue() : floorId;

    const query = {domainId: idX};
    const floorRecord = await this.floorSchema.findOne(query);

    if (floorRecord != null) {
      return FloorMap.toDomain(floorRecord);
    } else
      return null;

  }

  */

}


