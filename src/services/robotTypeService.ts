import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IRobotTypeService from './IServices/IRobotTypeService';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';
import IRobotTypeRepo from './IRepos/IRobotTypeRepo';
import { RobotType } from '../domain/robotType';
import { RobotTypeMap } from '../mappers/RobotTypeMap';
import ITaskTypeRepo from './IRepos/ITaskTypeRepo';
import {IBuildingDTO} from "../dto/IBuildingDTO";
import {Building} from "../domain/building";
import {BuildingMap} from "../mappers/BuildingMap";


@Service()
export default class RobotTypeService implements IRobotTypeService {
    constructor(
        @Inject(config.repos.robotType.name) private robotTypeRepo : IRobotTypeRepo,
        @Inject(config.repos.taskType.name) private taskTypeRepo : ITaskTypeRepo
    ) {}

  public async createRobotType(robotTypeDTO:IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {
    try {

      const robotOrError = await RobotType.create( robotTypeDTO );

      if (robotOrError.isFailure) {
        return Result.fail<IRobotTypeDTO>(robotOrError.errorValue());
      }

      const robotTypeResult = robotOrError.getValue();

      await this.robotTypeRepo.save(robotTypeResult);

      const robotTypeDTOResult = RobotTypeMap.toDTO( robotTypeResult ) as IRobotTypeDTO;
      return Result.ok<IRobotTypeDTO>( robotTypeDTOResult )
    } catch (e) {
      throw e;
    }
  }

    public async getAllRobotTypes(): Promise<Result<IRobotTypeDTO[]>> {
      try {
        const robotTypeList: RobotType[] = await this.robotTypeRepo.findAll();
        let robotTypeDto: IRobotTypeDTO[] = [];

        if (robotTypeList != null){
          for (let i = 0; i < robotTypeList.length; i++)
          robotTypeDto.push(RobotTypeMap.toDTO(robotTypeList[i]));
          return Result.ok<IRobotTypeDTO[]>(robotTypeDto);
        }
        return Result.fail<IRobotTypeDTO[]>("There are no Robot Types to return.");
      } catch (e) {
        return Result.fail<IRobotTypeDTO[]>(e.message);
      }
    }
}
