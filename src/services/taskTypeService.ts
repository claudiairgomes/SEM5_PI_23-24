import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import ITaskTypeService from './IServices/ITaskTypeService';
import ITaskTypeRepo from './IRepos/ITaskTypeRepo';
import ITaskTypeDTO from '../dto/ITaskTypeDTO';
import { TaskType } from '../domain/taskType';
import { TaskTypeMap } from '../mappers/TaskTypeMap';




@Service()
export default class TaskTypeService implements ITaskTypeService {
    constructor(
        @Inject(config.repos.taskType.name) private taskTypeRepo : ITaskTypeRepo
    ) {}

  public async createTaskType(taskTypeDTO: ITaskTypeDTO): Promise<Result<ITaskTypeDTO>> {
    try {

      const taskTypeOrError = await TaskType.create( taskTypeDTO );

      if (taskTypeOrError.isFailure) {
        return Result.fail<ITaskTypeDTO>(taskTypeOrError.errorValue());
      }

      const taskTypeResult = taskTypeOrError.getValue();

      await this.taskTypeRepo.save(taskTypeResult);

      const taskTypeDTOResult = TaskTypeMap.toDTO( taskTypeResult ) as ITaskTypeDTO;
      return Result.ok<ITaskTypeDTO>( taskTypeDTOResult )
    } catch (e) {
      throw e;
    }
  }

    public async getTaskType(name: string): Promise<Result<ITaskTypeDTO>> {
      try {
          const taskType = await this.taskTypeRepo.findByName(name);

          if (taskType === null) {
              return Result.fail<ITaskTypeDTO>('TaskType with Name "' + name + '" not found');
          }

          const taskTypeDTOResult = TaskTypeMap.toDTO( taskType ) as ITaskTypeDTO;
          return Result.ok<ITaskTypeDTO>( taskTypeDTOResult )
      } catch (e) {
          return Result.fail<ITaskTypeDTO>(e.message);
      }
    }

    public async getTaskTypeById(taskTypeId: string): Promise<Result<ITaskTypeDTO>> {
      try {
          const taskType = await this.taskTypeRepo.findByDomainId(taskTypeId);

          if (taskType === null) {
              return Result.fail<ITaskTypeDTO>('TaskType with ID "' + taskTypeId + '" not found');
          }

          const taskTypeDTOResult = TaskTypeMap.toDTO( taskType ) as ITaskTypeDTO;
          return Result.ok<ITaskTypeDTO>( taskTypeDTOResult )
      } catch (e) {
          return Result.fail<ITaskTypeDTO>(e.message);
      }
    }
}
