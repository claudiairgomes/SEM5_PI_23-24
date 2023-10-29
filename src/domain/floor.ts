import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { FloorId } from "./floorId";
import { Guard } from "../core/logic/Guard";
import {BuildingId} from "./buildingId";


interface FloorProps {
  buildingId: string;
  floorNumber: number;
  description: string;
}

export class Floor extends AggregateRoot<FloorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get floorId (): FloorId {
    return FloorId.caller(this.id)
  }

  get buildingId (): string {
    return this.props.buildingId
  }
  get floorNumber (): number {
    return this.props.floorNumber
  }
  get description (): string {
    return this.props.description;
  }

  private constructor (props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: FloorProps, id?: UniqueEntityID): Result<Floor> {

    const guardedProps = [
      { argument: props.buildingId, argumentName: 'buildingId' },
      { argument: props.floorNumber, argumentName: 'floorNumber' },
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
