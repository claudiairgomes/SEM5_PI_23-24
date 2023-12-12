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
import {IBuildingDTO} from "../dto/IBuildingDTO";

@Service()
export default class PassageService implements IPassageService{

  constructor(
    @Inject(config.repos.passage.name) private passageRepo : IPassageRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo

  ) {}


  public async createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
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
    }


  public async updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    try {
      const passage = await this.passageRepo.findByDomainId(passageDTO.id);

      if (passage === null) {
        return Result.fail<IPassageDTO>("Passage not found");
      } else {
        if (passageDTO.name !== undefined) {
          passage.props.name = passageDTO.name;
        }
        if (passageDTO.toFloor !== undefined) {
          passage.props.toFloor = passageDTO.toFloor;
        }
        if (passageDTO.fromFloor !== undefined) {
          passage.props.fromFloor = passageDTO.fromFloor;
        }
        if (passageDTO.description !== undefined) {
          passage.props.description = passageDTO.description;
        }
        await this.passageRepo.save(passage);

        const passageDTOResult = PassageMap.toDTO(passage) as IPassageDTO;
        return Result.ok<IPassageDTO>(passageDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllPassages() :Promise<Result<IPassageDTO>>{
    try {
      // Implement the logic to retrieve a list of all buildings from your data source
      // For example, if you have a BuildingRepository, you can call a method like getAllBuildings from there

      const passages = await this.passageRepo.findAll();

      // Return the list of building DTOs
      return passages;
    } catch (error) {
      // Handle any errors, log them, and return a Result indicating failure
      console.error('Error while fetching passages:', error);
      return Result.fail('Failed to fetch passages');
    }
  }
}
