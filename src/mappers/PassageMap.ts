import {Mapper} from "../core/infra/Mapper";
import {Passage} from "../domain/passage";
import {IPassageDTO} from "../dto/IPassageDTO";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";


export class PassageMap extends Mapper<Passage>{

  public static toDTO(passage: Passage): IPassageDTO {
    return {
      fromFloorId:passage.fromFloorId,
      toFloorId:passage.toFloorId,
      description: passage.description,
    }as IPassageDTO

  }

  public static async toDomain (raw: any): Promise<Passage>{

    const passageOrError = Passage.create(
      {
        fromFloorId:raw.fromFloorId,
        toFloorId:raw.toFloorId,
        description: raw.description,

      }, new UniqueEntityID(raw.domainId)
    )
    passageOrError.isFailure ? console.log(passageOrError.error): '';
    return passageOrError.isSuccess? passageOrError.getValue(): null;
  }

  public static toPersistence(passage: Passage): any{
    const a = {
      domainId: passage.id.toString(),
      fromFloorId:passage.fromFloorId,
      toFloorId:passage.toFloorId,
      description: passage.description,
    }
    return a;
  }
}


