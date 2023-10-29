import {Passage} from "../../domain/passage";
import {Repo} from "../../core/infra/Repo";
import {PassageId} from "../../domain/passageId";

export default interface IPassageRepo extends Repo<Passage>{
  save (passage:Passage): Promise <Passage>;
  //findById(id:string): Promise<Passage>;
  findByDomainId (bloorId: PassageId | string): Promise<Passage>;
}
