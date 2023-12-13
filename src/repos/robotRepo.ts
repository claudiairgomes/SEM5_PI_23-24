import { Service, Inject } from 'typedi';

import {Document, FilterQuery, Model} from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

import IRobotRepo from "../services/IRepos/IRobotRepo";
import { Robot } from "../domain/robot";
import { RobotId } from "../domain/robotId";
import { RobotMap } from "../mappers/RobotMap";



@Service()
export default class RobotRepo implements IRobotRepo {
  private models: any;

  constructor(
    @Inject('robotSchema') private robotSchema : Model<IRobotPersistence & Document>,
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (robotId: RobotId | string): Promise<boolean> {

    const idX = robotId instanceof RobotId ? (<RobotId>robotId).id.toValue() : robotId;

    const query = { domainId: idX};
    const robotDocument = await this.robotSchema.findOne( query );

    return !!robotDocument === true;
  }

  public async save (robot: Robot): Promise<Robot> {
    const query = { domainId: robot.id.toString() };

    const robotDocument = await this.robotSchema.findOne( query );

    try {
      if (robotDocument === null ) {
        const rawRobot: any = RobotMap.toPersistence(robot);

        const robotCreated = await this.robotSchema.create(rawRobot);

        return RobotMap.toDomain(robotCreated);
      } else {
        robotDocument.name = robot.name;
        robotDocument.codRobot = robot.codRobot;
        robotDocument.type=robot.type;
        robotDocument.serialNumber=robot.serialNumber;
        robotDocument.description=robot.description;
        await robotDocument.save();

        return robot;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findById (robotId: RobotId | string): Promise<Robot> {

    const idX = RobotId instanceof RobotId ? (<RobotId>robotId).id.toValue() : RobotId;

    const query = { domainId: idX };
    const RobotRecord = await this.robotSchema.findOne( query );

    if( RobotRecord != null) {
      return RobotMap.toDomain(RobotRecord);
    }
    else
      return null;
  }
  async findByDomainId(robotId: RobotId | string): Promise<Robot> {

    const query = { domainId: robotId};
    const robotRecord = await this.robotSchema.findOne( query as FilterQuery<IRobotPersistence & Document> );

    if( robotRecord != null) {

      return RobotMap.toDomain(robotRecord);
    }
    else
      return null;
    console.log("Robot doesn't exist");
  }


    //return buildingRecords.map((record) => BuildingMap.toDomain(record));
  

  public async findAll(){
    try{

      return await this.robotSchema.find();
    }catch (e){
      throw e;
    }


    }

}
