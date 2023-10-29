import {Building} from "./building";
import List = Mocha.reporters.List;
import {Floor} from "./floor";
import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

import {Result} from "../core/logic/Result";
import {Guard} from "../core/logic/Guard";
import {ElevatorId} from "./elevatorId";

interface ElevatorProps{
  building: string;
  floorList: Array<string>;
  brand: string;//(opcional)
  model: string;//(opcional)
  serialNumber: string;//(optional)
  description: string;//(optional)


}



export class Elevator extends AggregateRoot<ElevatorProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get ElevatorId(): ElevatorId {
    return ElevatorId.caller(this.id)
  }

  get building(): string{
    return this.props.building;
  }

  get floorList(): string[] {
    return this.props.floorList;
  }

  setFloorList(floorList: string[]): void {
    this.props.floorList = floorList;
  }

  get brand(): string {
    return this.props.brand;
  }

  get model (): string {
    return this.props.model;
  }

  get serialNumber(): string {
    return this.props.serialNumber;
  }

  get description(): string {
    return this.props.description;
  }

  constructor(props: ElevatorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {

    const guardedProps = [
      {argument: props.building, argumentName: 'building'},
      {argument: props.floorList, argumentName: 'floorList'},
      {argument: props.brand, argumentName: 'brand'},
      {argument: props.model, argumentName: 'model'},
      {argument: props.serialNumber, argumentName: 'serialNumber'},
      {argument: props.description, argumentName: 'description'},

    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);


    if (!guardResult.succeeded) {
      return Result.fail<Elevator>(guardResult.message)
    } else {
      const elevator = new Elevator({
        ...props
      }, id);

      return Result.ok<Elevator>(elevator);

    }
  }

}
