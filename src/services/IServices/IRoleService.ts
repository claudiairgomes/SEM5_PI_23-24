import { Result } from "../../core/logic/Result";
import IRoleDTO from "../../dto/IRoleDTO";
import {IFloorDTO} from "../../dto/IFloorDTO";
import {IBuildingDTO} from "../../dto/IBuildingDTO";

export default interface IRoleService  {
  createRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>>;
  updateRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>>;
  getRole (roleId: string): Promise<Result<IRoleDTO>>;
  getAllRoles():Promise<Result<IRoleDTO>>;


}
