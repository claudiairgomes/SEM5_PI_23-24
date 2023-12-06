import {IBuildingDTO} from "../../dto/IBuildingDTO";
import {Result} from "../../core/logic/Result";
import { Building } from "../../domain/building";


export default interface IBuildingService{
createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;

updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;

getAllBuildings():Promise<Result<IBuildingDTO>> ;

getBuildingById(buildingId:string):Promise<Result<IBuildingDTO>>;

getBuildingsByFloorRange(min:number,max:number);
}
