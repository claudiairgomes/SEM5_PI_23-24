import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {RoomId} from "./roomId";
import {Result} from "../core/logic/Result";
import {Guard} from "../core/logic/Guard";



interface RoomProps{
  name: string;// (opcional)
  description: string;//(opcional)
  dimension: string; //em termos de celulas
  code: string; //(obrigatório) máx. e caracteres
  //lista de pisos?
 // id: string //(obrigatório)
  floor: string;


}

export class Room extends AggregateRoot<RoomProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get buildingId(): RoomId {
    return RoomId.caller(this.id)
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description;
  }

  get dimension(): string {
    return this.props.dimension;
  }

  get code(): string {
    return this.props.code;
  }

  get floor(): string {
    return this.props.floor;
  }

  constructor(props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: RoomProps, id?: UniqueEntityID): Result<Room> {

    const guardedProps = [
      {argument: props.name, argumentName: 'name'},
      {argument: props.description, argumentName: 'description'},
      {argument: props.dimension, argumentName: 'dimension'},
      {argument: props.code, argumentName: 'code'},
      {argument: props.floor, argumentName: 'floor'},
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);


    if (!guardResult.succeeded) {
      return Result.fail<Room>(guardResult.message)
    } else {
      const room = new Room({
        ...props
      }, id);

      return Result.ok<Room>(room);

    }
  }

}


