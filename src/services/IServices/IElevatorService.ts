import {IBuildingDTO} from "../../dto/IBuildingDTO";
import {Result} from "../../core/logic/Result";
import {IElevatorDTO} from "../../dto/IElevatorDTO";
import {IElevatorDTObeta} from "../../dto/IElevatorDTObeta";

export default interface IElevatorService{
  createElevator(elevatorDTO: IElevatorDTObeta): Promise<Result<IElevatorDTO>>;

  updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;

  getAllElevators();
}
