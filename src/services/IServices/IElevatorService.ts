import {IBuildingDTO} from "../../dto/IBuildingDTO";
import {Result} from "../../core/logic/Result";
import {IElevatorDTO} from "../../dto/IElevatorDTO";


export default interface IElevatorService{
  createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;

  updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;

  getAllElevators();

  getElevatorById(elevatorId:string):Promise<Result<IElevatorDTO>>;
}
