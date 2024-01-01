import {Elevator} from "../../domain/elevator";
import {Repo} from "../../core/infra/Repo";
import {ElevatorId} from "../../domain/elevatorId";


export default interface IElevatorRepo extends Repo<Elevator>{
  save (elevator:Elevator): Promise <Elevator>;
  //findById(id:string): Promise<Building>;
  findByDomainId (buildingId: ElevatorId | string): Promise<Elevator>;
  findByBuildingId(buildingID: string): Promise<Elevator>;
  findAll();
}
