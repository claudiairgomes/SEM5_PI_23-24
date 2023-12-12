import {Mapper} from "../core/infra/Mapper";
import {Passage} from "../domain/passage";
import {IPassageDTO} from "../dto/IPassageDTO";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";


export class PassageMap extends Mapper<Passage>{

  public static toDTO(passage: Passage): IPassageDTO {
    return {
      name:passage.name,
      fromFloor:passage.fromFloor,
      toFloor:passage.toFloor,
      description: passage.description,
    }as IPassageDTO

  }

  public static async toDomain (raw: any): Promise<Passage>{

    const passageOrError = Passage.create(
      {
        name:raw.name,
        fromFloor:raw.fromFloor,
        toFloor:raw.toFloor,
        description: raw.description,

      }, new UniqueEntityID(raw.domainId)
    )
    passageOrError.isFailure ? console.log(passageOrError.error): '';
    return passageOrError.isSuccess? passageOrError.getValue(): null;
  }

  public static toPersistence(passage: Passage): any{
    const a = {
      domainId: passage.id.toString(),
      name: passage.name,
      fromFloor:passage.fromFloor,
      toFloor:passage.toFloor,
      description: passage.description,
    }
    return a;
  }
}


