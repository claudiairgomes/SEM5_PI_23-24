import {Building} from "../../domain/building";
import {Repo} from "../../core/infra/Repo";
import {BuildingId} from "../../domain/buildingId";

export default interface IBuildingRepo extends Repo<Building>{
  save (building:Building): Promise <Building>;
  //findById(id:string): Promise<Building>;

  findByCode(code:string): Promise<Building>

  findByDomainId (buildingId: BuildingId | string): Promise<Building>;

  findAll();
}
