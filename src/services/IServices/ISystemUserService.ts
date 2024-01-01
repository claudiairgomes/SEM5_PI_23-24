import { Result } from '../../core/logic/Result';
import ISystemUserDTO from '../../dto/ISystemUserDTO';
import {IBuildingDTO} from "../../dto/IBuildingDTO";

export default interface ISystemUserService {
  createSystemUser(systemUserDTO: ISystemUserDTO): Promise<Result<ISystemUserDTO>>;
  removeSystemUser(systemUserDTO: ISystemUserDTO): Promise<Result<void>>;
  getSystemUserById(systemUserId: string): Promise<Result<ISystemUserDTO>>;
  getSystemUserByEmail(systemUserEmail: string): Promise<Result<ISystemUserDTO>>;



}
