import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';
import { RobotType } from '../domain/robotType';
import {RobotTypeId} from "../domain/robotTypeId";
import IRobotTypeRepo from '../services/IRepos/IRobotTypeRepo';
import { RobotTypeMap } from '../mappers/RobotTypeMap';

@Service()
export default class RobotTypeRepo implements IRobotTypeRepo {
    private models: any;

    constructor(
        @Inject('robotTypeSchema') private robotTypeSchema : Model<IRobotTypePersistence & Document>,
    ) {}

    private createBaseQuery (): any {
        return {
          where: {},
        }
    }

    public async exists(robotTypeId: RobotTypeId |string): Promise<boolean> {
        const idx = robotTypeId instanceof RobotTypeId ? (<RobotTypeId>robotTypeId).id.toValue() : robotTypeId;

        const query = { domainId: idx};
        const robotTypeDocument = await this.robotTypeSchema.findOne( query as FilterQuery<IRobotTypePersistence & Document>);
        return !!robotTypeDocument === true;
    }

    public async save(robotType: RobotType): Promise<RobotType> {
        const query = { domainId: robotType.id.toString()};

        const robotTypeDocument = await this.robotTypeSchema.findOne( query );

        try {
            if(robotTypeDocument === null) {
                const rawRobotType: any = RobotTypeMap.toPersistence(robotType);

                const robotTypeCreated = await this.robotTypeSchema.create(rawRobotType);

                return RobotTypeMap.toDomain(robotTypeCreated);
            }else{

                await robotTypeDocument.save();

                return robotType;
            }

        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId (robotTypeId: RobotTypeId | string): Promise<RobotType> {
        const query = { domainId: robotTypeId};
        const robotTypeRecord = await this.robotTypeSchema.findOne( query as FilterQuery<IRobotTypePersistence & Document> );

        if( robotTypeRecord != null) {
          return RobotTypeMap.toDomain(robotTypeRecord);
        }
        else
          return null;
    }

    public async findByObjectId (robotTypeId: string | string): Promise<RobotType> {
        const query = { _id: robotTypeId};
        const robotTypeRecord = await this.robotTypeSchema.findOne( query as FilterQuery<IRobotTypePersistence & Document> );

        if( robotTypeRecord != null) {
          return RobotTypeMap.toDomain(robotTypeRecord);
        }
        else
          return null;
    }

    public async findByCode (code: string): Promise<RobotType> {
        const query = { code: code };
        const robotTypeRecord = await this.robotTypeSchema.findOne( query as FilterQuery<IRobotTypePersistence & Document> );

        if( robotTypeRecord != null) {
          return RobotTypeMap.toDomain(robotTypeRecord);
        }
        else
          return null;
    }

    public async findAll(): Promise<RobotType[]> {
      const robotTypesList = await this.robotTypeSchema.find();
      return RobotTypeMap.toDomainBulk(robotTypesList);
    }
}
