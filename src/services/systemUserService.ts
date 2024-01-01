import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import ISystemUserDTO from '../dto/ISystemUserDTO';
import { SystemUser } from '../domain/systemUser';
import ISystemUserService from './IServices/ISystemUserService';
import ISystemUserRepo from './IRepos/ISystemUserRepo';
import { SystemUserMap } from '../mappers/SystemUserMap';
import {IBuildingDTO} from "../dto/IBuildingDTO";
import {BuildingMap} from "../mappers/BuildingMap";

@Service()
export default class SystemUserService implements ISystemUserService {
  constructor(@Inject(config.repos.systemUser.name) private systemUserRepo: ISystemUserRepo) {}

  public async createSystemUser(systemUserDTO: ISystemUserDTO): Promise<Result<ISystemUserDTO>> {
    try {

            const systemUserOrError = await SystemUser.create(systemUserDTO);

      if (systemUserOrError.isFailure) {
        return Result.fail<ISystemUserDTO>(systemUserOrError.errorValue());
      }

      // checks if theres already a RobotType with the code provided
      const systemUserDocument = await this.systemUserRepo.findByEmail(systemUserDTO.email);
      const found = !!systemUserDocument;

      if (found) {
        return Result.fail<ISystemUserDTO>('System User already exists with email:' + systemUserDTO.email);
      }

      const systemUserOrErr = await SystemUser.create({
        email: systemUserDTO.email,
        role: systemUserDTO.role,
        password: systemUserDTO.password
      });

      if (systemUserOrError.isFailure) {
        return Result.fail<ISystemUserDTO>(systemUserOrErr.errorValue());
      }

      const taskTypeResult = systemUserOrErr.getValue();

      // saves the new created building and returns the building DTO
      await this.systemUserRepo.save(taskTypeResult);

      const systemUserDTOResult = SystemUserMap.toDTO( taskTypeResult ) as ISystemUserDTO;
        return Result.ok<ISystemUserDTO>( systemUserDTOResult )
      } catch (e) {
        throw e;
    }
}

  public async removeSystemUser(systemUserDTO:ISystemUserDTO): Promise<Result<void>> {
    try {
      // Check if the user exists before attempting to remove
      const existingSystemUser = await this.systemUserRepo.findByDomainId(systemUserDTO.id);

      if (!existingSystemUser) {
        return Result.fail<void>('System User not found');
      }

      // Perform the removal
      await this.systemUserRepo.remove(existingSystemUser);

      return Result.ok<void>();
    } catch (e) {
      // Handle any exceptions that might occur during the removal process
      throw e;
    }
  }

  public async getSystemUserById(systemUserId:string): Promise<Result<ISystemUserDTO>> {

    // try{
    console.log("System user of id:")
    const systemUser = await this.systemUserRepo.findByDomainId(systemUserId);

    console.log("System user of id:")
    console.log(systemUser);

    const systemUserDTOresult = SystemUserMap.toDTO( systemUser ) as ISystemUserDTO;
    return Result.ok<ISystemUserDTO>( systemUserDTOresult )

    console.log(systemUserDTOresult);
    /*} catch (error) {
        // Handle any errors, log them, and return a Result indicating failure
        console.error('Error while fetching building:', error);
        return Result.fail('Failed to get building');
      }*/
  }

  public async getSystemUserByEmail(systemUserEmail:string): Promise<Result<ISystemUserDTO>> {

    // try{
    console.log("System user of email:")
    const systemUser = await this.systemUserRepo.findByEmail(systemUserEmail);

    console.log("System user of email:")
    console.log(systemUser);

    const systemUserDTOresult = SystemUserMap.toDTO( systemUser ) as ISystemUserDTO;
    return Result.ok<ISystemUserDTO>( systemUserDTOresult )

    console.log(systemUserDTOresult);
    /*} catch (error) {
        // Handle any errors, log them, and return a Result indicating failure
        console.error('Error while fetching building:', error);
        return Result.fail('Failed to get building');
      }*/
  }


}
