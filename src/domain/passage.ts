import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import {PassageId} from "./passageId";


interface PassageProps {
  name: string;
  fromFloor: string;
  toFloor:string;
  description: string;
}

export class Passage extends AggregateRoot<PassageProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get passageId (): PassageId {
    return PassageId.caller(this.id)
  }

  get name (): string {
    return this.props.name;
  }
  get fromFloor (): string {
    return this.props.fromFloor;
  }
  get toFloor (): string {
    return this.props.toFloor;
  }
  get description (): string {
    return this.props.description;
  }

  private constructor (props: PassageProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PassageProps, id?: UniqueEntityID): Result<Passage> {

    const guardedProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.fromFloor, argumentName: 'fromFloor' },
      { argument: props.toFloor, argumentName: 'toFloor' },
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
