import {Inject, Service} from "typedi";
import IFloorService from "./IServices/IFloorService";
import {IFloorDTO} from "../dto/IFloorDTO";
import {Result} from "../core/logic/Result";
import config from "../../config";


import IPassageService from "./IServices/IPassageService";
import IPassageRepo from "./IRepos/IPassageRepo";
import {IPassageDTO} from "../dto/IPassageDTO";
import {PassageMap} from "../mappers/PassageMap";
import {Passage} from "../domain/passage";

@Service()
export default class PassageService implements IPassageService{

  constructor(
    @Inject(config.repos.passage.name) private passageRepo : IPassageRepo

  ) {}

  public async getPassage( passageId: string): Promise<Result<IPassageDTO>> {
    try {
      const passage = await this.passageRepo.findByDomainId(passageId);

      if (passage === null) {
        return Result.fail<IPassageDTO>("Passage not found");
      }
      else {
        const passageDTOResult = PassageMap.toDTO( passage ) as IPassageDTO;
        return Result.ok<IPassageDTO>( passageDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }


  public async createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    try {

      const passageOrError = await Passage.create( passageDTO );

      if (passageOrError.isFailure) {
        return Result.fail<IPassageDTO>(passageOrError.errorValue());
      }

      const passageResult = passageOrError.getValue();

      await this.passageRepo.save(passageResult);

      const passageDTOResult = PassageMap.toDTO( passageResult ) as IPassageDTO;
      return Result.ok<IPassageDTO>( passageDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    try {
      const passage = await this.passageRepo.findByDomainId(passageDTO.id);

      if (passage === null) {
        return Result.fail<IPassageDTO>("Passage not found");
      }
      else {
        passage.props.fromFloorId = passageDTO.fromFloorId;
        passage.props.toFloorId = passageDTO.toFloorId;
        passage.props.description = passageDTO.description;
        await this.passageRepo.save(passage);

        const passageDTOResult = PassageMap.toDTO( passage ) as IPassageDTO;
        return Result.ok<IPassageDTO>( passageDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }
}
