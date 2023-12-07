import {IFloorDTO} from "../../dto/IFloorDTO";
import {Result} from "../../core/logic/Result";
import {IBuildingDTO} from "../../dto/IBuildingDTO";


export default interface IFloorService{
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  getFloorById(floorId:string):Promise<Result<IFloorDTO>>;
  getAllFloors();

}
