import { Service, Inject } from 'typedi';

import {Document, FilterQuery, Model} from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

import IRobotRepo from "../services/IRepos/IRobotRepo";
import { Robot } from "../domain/robot";
import { RobotId } from "../domain/robotId";
import { RobotMap } from "../mappers/RobotMap";
import {BuildingId} from "../domain/buildingId";
import {Building} from "../domain/building";


@Service()
export default class RobotRepo implements IRobotRepo {
  private models: any;

  constructor(
    @Inject('robotSchema') private RobotSchema : Model<IRobotPersistence & Document>,
  //  @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (robotId: RobotId | string): Promise<boolean> {

    const idX = robotId instanceof RobotId ? (<RobotId>robotId).id.toValue() : robotId;

    const query = { domainId: idX};
    const robotDocument = await this.RobotSchema.findOne( query );

    return !!robotDocument === true;
  }

  public async save (robot: Robot): Promise<Robot> {
    const query = { domainId: robot.id.toString() };

    const robotDocument = await this.RobotSchema.findOne( query );

    try {
      if (robotDocument === null ) {
        const rawRobot: any = RobotMap.toPersistence(robot);

        const robotCreated = await this.RobotSchema.create(rawRobot);

        return RobotMap.toDomain(robotCreated);
      } else {
        robotDocument.nickname = robot.nickname;
        robotDocument.codRobot = robot.codRobot;
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
    const RobotRecord = await this.RobotSchema.findOne( query );

    if( RobotRecord != null) {
      return RobotMap.toDomain(RobotRecord);
    }
    else
      return null;
  }
  findByDomainId(robotId: RobotId | string): Promise<Robot> {
    return Promise.resolve(undefined);
  }
}
