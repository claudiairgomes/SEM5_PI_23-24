import {Floor} from "../../domain/floor";
import {Repo} from "../../core/infra/Repo";
import {FloorId} from "../../domain/floorId";

export default interface IFloorRepo extends Repo<Floor>{
  save (bloor:Floor): Promise <Floor>;
  findById(id:string): Promise<Floor>;

  findByCode(code:string): Promise<Floor>

  findByDomainId (floorId: FloorId | string): Promise<Floor>;
}
