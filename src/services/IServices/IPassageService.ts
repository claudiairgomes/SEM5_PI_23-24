import {IPassageDTO} from "../../dto/IPassageDTO";
import {Result} from "../../core/logic/Result";
import {IBuildingDTO} from "../../dto/IBuildingDTO";


export default interface IPassageService{
  createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;
  updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;
  getAllPassages():Promise<Result<IPassageDTO>>;
  getAllPassages():Promise<Result<IPassageDTO>> ;
  getPassageById(passageId:string):Promise<Result<IPassageDTO>>;
}
