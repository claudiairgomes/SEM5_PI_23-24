import {IBuildingDTO} from "../../dto/IBuildingDTO";
import {Result} from "../../core/logic/Result";


export default interface IBuildingService{
createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;

updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
}
