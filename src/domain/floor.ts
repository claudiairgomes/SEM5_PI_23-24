import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { FloorId } from "./floorId";
import { Guard } from "../core/logic/Guard";
import {BuildingId} from "./buildingId";


interface FloorProps {
  building: string;
  name:string;
  number: number;
  description: string;
}

export class Floor extends AggregateRoot<FloorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get floorId (): FloorId {
    return FloorId.caller(this.id)
  }

  get building (): string {
    return this.props.building
  }

  get name (): string {
    return this.props.name
  }
  get number (): number {
    return this.props.number
  }
  get description (): string {
    return this.props.description;
  }

  constructor (props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: FloorProps, id?: UniqueEntityID): Result<Floor> {

    const guardedProps = [
      { argument: props.building, argumentName: 'building' },
      { argument: props.name, argumentName: 'name' },
      { argument: props.number, argumentName: 'number' },
      { argument: props.description, argumentName: 'description' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Floor>(guardResult.message)
    }
    else {
      const floor = new Floor({
        ...props
      }, id);

      return Result.ok<Floor>(floor);
    }
  }
}
