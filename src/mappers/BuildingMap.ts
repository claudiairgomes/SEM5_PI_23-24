import {Mapper} from "../core/infra/Mapper";
import {Building} from "../domain/building";
import {IBuildingDTO} from "../dto/IBuildingDTO";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";


export class BuildingMap extends Mapper<Building>{

  public static toDTO(building: Building): IBuildingDTO {
    return {
      id: building.id.toString(),
      name: building.name,
      description: building.description,
      dimension: building.dimension,
      code: building.code,
    }as IBuildingDTO

  }

  public static async toDomain (raw: any): Promise<Building>{

    const buildingOrError = Building.create(
      {
        name: raw.name,
        description: raw.description,
        dimension: raw.dimension,
        code: raw.code,
      }, new UniqueEntityID(raw.domainId)
    )
    buildingOrError.isFailure ? console.log(buildingOrError.error): '';
    return buildingOrError.isSuccess? buildingOrError.getValue(): null;
  }

  public static toPersistence(building: Building): any{
    const a = {
      domainId: building.id.toString(),
      name: building.name,
      description: building.description,
      dimension: building.dimension,
      code: building.code
    }
    return a;
  }
}
