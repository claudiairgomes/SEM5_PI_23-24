import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {BuildingId} from "./buildingId";
import {Result} from "../core/logic/Result";
import {Guard} from "../core/logic/Guard";



interface BuildingProps{
  name: string;// (opcional)
  description: string;//(opcional)
  dimension: string; //em termos de celulas
  code: string; //(obrigatório) máx. e caracteres
  //lista de pisos?
 // id: string //(obrigatório)


}

export class Building extends AggregateRoot<BuildingProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get buildingId(): BuildingId {
    return BuildingId.caller(this.id)
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

  constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: BuildingProps, id?: UniqueEntityID): Result<Building> {

    const guardedProps = [
      {argument: props.name, argumentName: 'name'},
      {argument: props.description, argumentName: 'description'},
      {argument: props.dimension, argumentName: 'dimension'},
      {argument: props.code, argumentName: 'code'},

    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);


    if (!guardResult.succeeded) {
      return Result.fail<Building>(guardResult.message)
    } else {
      const building = new Building({
        ...props
      }, id);

      return Result.ok<Building>(building);

    }
  }

}


