import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import {PassageId} from "./passageId";


interface PassageProps {
  fromFloorId: string;
  toFloorId:string;
  description: string;
}

export class Passage extends AggregateRoot<PassageProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get passageId (): PassageId {
    return PassageId.caller(this.id)
  }
  get fromFloorId (): string {
    return this.props.fromFloorId;
  }
  get toFloorId (): string {
    return this.props.toFloorId;
  }
  get description (): string {
    return this.props.description;
  }

  private constructor (props: PassageProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PassageProps, id?: UniqueEntityID): Result<Passage> {

    const guardedProps = [
      { argument: props.fromFloorId, argumentName: 'fromFloorId' },
      { argument: props.toFloorId, argumentName: 'toFloorId' },
      { argument: props.description, argumentName: 'description' },


    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Passage>(guardResult.message)
    }
    else {
      const passage = new Passage({
        ...props
      }, id);

      return Result.ok<Passage>(passage);
    }
  }
}
