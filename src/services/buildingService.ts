import {Inject, Service} from "typedi";
import IBuildingService from "./IServices/IBuildingService";
import {IBuildingDTO} from "../dto/IBuildingDTO";
import {Result} from "../core/logic/Result";
import config from "../../config";


import IBuildingRepo from "./IRepos/IBuildingRepo";
import {Building} from "../domain/building";
import {BuildingMap} from "../mappers/BuildingMap";

@Service()
export default class BuildingService implements IBuildingService{

  constructor(
    @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
  ) {}

  public async getBuilding( buildingId: string): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByDomainId(buildingId);

      if (building === null) {
        return Result.fail<IBuildingDTO>("Role not found");
      }
      else {
        const roleDTOResult = BuildingMap.toDTO( building ) as IBuildingDTO;
        return Result.ok<IBuildingDTO>( roleDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }


  public async createBuilding(roleDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {

      const roleOrError = await Building.create( roleDTO );

      if (roleOrError.isFailure) {
        return Result.fail<IBuildingDTO>(roleOrError.errorValue());
      }

      const roleResult = roleOrError.getValue();

      await this.buildingRepo.save(roleResult);

      const roleDTOResult = BuildingMap.toDTO( roleResult ) as IBuildingDTO;
      return Result.ok<IBuildingDTO>( roleDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByDomainId(buildingDTO.id);

      if (building === null) {
        return Result.fail<IBuildingDTO>("Building not found");
      }
      else {
        building.props.name = buildingDTO.name;
        await this.buildingRepo.save(building);

        const buildingDTOResult = BuildingMap.toDTO( building ) as IBuildingDTO;
        return Result.ok<IBuildingDTO>( buildingDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }
}
