import { Service, Inject } from 'typedi';
import IElevatorRepo from "../services/IRepos/IElevatorRepo";
import {Document, FilterQuery, Model} from "mongoose";
import {IBuildingPersistence} from "../dataschema/IBuildingPersistence";
import {IElevatorPersistence} from "../dataschema/IElevatorPersistence";
import {ElevatorId} from "../domain/elevatorId";
import {Elevator} from "../domain/elevator";
import {ElevatorMap} from "../mappers/ElevatorMap";
import {Building} from "../domain/building";


@Service()
export default class ElevatorRepo implements IElevatorRepo{

  private models: any;

  constructor(
    @Inject('elevatorSchema') private elevatorSchema: Model<IElevatorPersistence & Document>,

  ){}
  private createBaseQuery(): any{
    return{
      where:{},
    }
  }

  public async exists (elevatorId: ElevatorId | string): Promise<boolean>{
    const idx = elevatorId instanceof ElevatorId? (<ElevatorId>elevatorId).id.toValue(): elevatorId;

    const query = {domainId: idx};
    const elevatorDocument = await this.elevatorSchema.findOne(query);

    return  !!elevatorDocument === true;
  }

  public async save (elevator: Elevator): Promise<Elevator>{
    const query = { domainId: elevator.id.toString() };

    const elevatorDocument = await this.elevatorSchema.findOne( query );

    try {
      if (elevatorDocument === null ) {
        const rawElevator: any = ElevatorMap.toPersistence(elevator);

        const elevatorCreated = await this.elevatorSchema.create(rawElevator);

        return ElevatorMap.toDomain(elevatorCreated);
      } else {

        elevatorDocument.building= elevator.building;
        elevatorDocument.floorList = elevator.floorList;
        elevatorDocument.brand= elevator.brand;

        //model nao corresponde
        elevatorDocument.baseModelName= elevator.model;


        elevatorDocument.serialNumber= elevator.serialNumber;
        elevatorDocument.description= elevator.description;
        await elevatorDocument.save();

        return elevator;
      }
    } catch (err) {
      throw err;
    }
  }



  findByDomainId(elevatorId: ElevatorId | string): Promise<Elevator> {
    const query = { domainId: elevatorId};
    const elevatorRecord = this.elevatorSchema.findOne( query as FilterQuery<IElevatorPersistence & Document> );

    if( elevatorRecord != null) {
      return ElevatorMap.toDomain(elevatorRecord);
    }
    else
      return null;
    console.log("Elevator doesn't exist");
  }

  public async findByBuildingId(buildingId: string): Promise<Elevator> {
    const query = { buildingId: buildingId };
    const elevatorRecord = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);

    if (elevatorRecord != null) {
      return ElevatorMap.toDomain(elevatorRecord);
    } else {
      return null;
    }
  }

  async findAll(){
    try{
      //const buildingRecords = await this.buildingSchema.find();
      return await this.elevatorSchema.find();
    }catch (e){
      throw e;
    }

    //return buildingRecords.map((record) => BuildingMap.toDomain(record));
  }


}
