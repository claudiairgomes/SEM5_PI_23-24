import {IBuildingDTO} from "../../dto/IBuildingDTO";
import {Result} from "../../core/logic/Result";
import {IElevatorDTO} from "../../dto/IElevatorDTO";


export default interface IElevatorService{
  createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  getAllElevators():Promise<Result<IElevatorDTO[]>>;
  getElevatorByBuilding(buildingId: string): Promise<Result<IElevatorDTO>>;
  getElevatorById(elevatorId:string):Promise<Result<IElevatorDTO>>;
}
