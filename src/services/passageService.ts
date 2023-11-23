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
import IFloorRepo from "./IRepos/IFloorRepo";

@Service()
export default class PassageService implements IPassageService{

  constructor(
    @Inject(config.repos.passage.name) private passageRepo : IPassageRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo

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
    if (this.isPassage(passageDTO)) {
      try {
        const passageOrError = await Passage.create(passageDTO);

        if (passageOrError.isFailure) {
          return Result.fail<IPassageDTO>(passageOrError.errorValue());
        }

        const passageResult = passageOrError.getValue();

        await this.passageRepo.save(passageResult);

        const passageDTOResult = PassageMap.toDTO(passageResult) as IPassageDTO;
        return Result.ok<IPassageDTO>(passageDTOResult);
      } catch (e) {
        throw e;
      }
    } else {
      console.log("Passage not valid | Floors are on the same building");
      // You may want to return an error result here instead of using console.log.
      return Result.fail<IPassageDTO>("Passage not valid | Floors are on the same building");
    }
  }

  public async updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
      try {
        const passage = await this.passageRepo.findByDomainId(passageDTO.id);

        if (passage === null) {
          return Result.fail<IPassageDTO>("Passage not found");
        }
        else {
          if(passageDTO.toFloorId!==undefined){
            passage.props.toFloorId = passageDTO.toFloorId;
          }
          if (passageDTO.fromFloorId!==undefined){
            passage.props.fromFloorId = passageDTO.fromFloorId;
          }
          if (passageDTO.description!==undefined){
            passage.props.description = passageDTO.description;
          }
          await this.passageRepo.save(passage);

          const passageDTOResult = PassageMap.toDTO( passage ) as IPassageDTO;
          return Result.ok<IPassageDTO>( passageDTOResult )
        }
      } catch (e) {
        throw e;
      }



  }

  protected async isPassage(passageDTO: IPassageDTO): Promise<boolean>{
    const building1= await this.floorRepo.findByDomainId(passageDTO.fromFloorId);
    const building2= await this.floorRepo.findByDomainId(passageDTO.toFloorId)

    console.log(this.floorRepo.exists(passageDTO.fromFloorId.toString()));
    console.log(building2 !== null);


    if (this.floorRepo.exists(passageDTO.fromFloorId.toString())  &&  this.floorRepo.exists(passageDTO.toFloorId.toString())
      && building2!== null && building2 !== null ){
      if((!building1.equals(building2))) return true
    }
    return false;
  }
}
