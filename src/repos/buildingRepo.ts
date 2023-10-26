import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';

import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import {Building} from "../domain/building";
import {BuildingId} from "../domain/buildingId";
import {BuildingMap} from "../mappers/BuildingMap";
import {UserId} from "../domain/userId";
import {UserMap} from "../mappers/UserMap";

@Service()
export default class BuildingRepo implements IBuildingRepo{
  findByDomainId(buildingId: BuildingId | string): Promise<Building> {
    return Promise.resolve(undefined);
  }

private models: any;

constructor(
  @Inject('buildingSchema') private buildingSchema: Model<IBuildingPersistence & Document>,

){}
  private createBaseQuery(): any{
  return{
    where:{},
  }
  }

  public async exists (buildingId: BuildingId | string): Promise<boolean>{
  const idx = buildingId instanceof BuildingId ? (<BuildingId>buildingId).id.toValue(): buildingId;

  const query = {domainId: idx};
  const buildingDocument = await this.buildingSchema.findOne(query);

  return  !!buildingDocument === true;
  }

  public async save (building: Building): Promise<Building>{
    const query = { domainId: building.id.toString() };

    const buildingDocument = await this.buildingSchema.findOne( query );

    try {
      if (buildingDocument === null ) {
        const rawBuilding: any = BuildingMap.toPersistence(building);

        const buildingCreated = await this.buildingSchema.create(rawBuilding);

        return BuildingMap.toDomain(buildingCreated);
      } else {

        buildingDocument.name= building.name;
        buildingDocument.description = building.description;
        buildingDocument.dimension= building.dimension;
        buildingDocument.code= building.code;
        await buildingDocument.save();

        return building;
      }
    } catch (err) {
      throw err;
    }
  }


  async findByCode(code: string): Promise<Building> {
    const query = {code: code.toString()};
    const buildingRecord = await this.buildingSchema.findOne(query);

    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    } else return null;
  }

  async findById(buildingId: BuildingId | string): Promise<Building> {

    const idX = buildingId instanceof BuildingId ? (<BuildingId>buildingId).id.toValue() : buildingId;

    const query = {domainId: idX};
    const buildingRecord = await this.buildingSchema.findOne(query);

    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    } else
      return null;

  }

}


