import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import IRobotTypeDTO from "../dto/IRobotTypeDTO";
import RobotTypeController from "../controllers/robotTypeController";

interface RobotTypeProps {
    code: string;
    brand: string;
    model: string;
    taskTypes: string[];
}

export class RobotType extends AggregateRoot<RobotTypeProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get code(): string {
    return this.props.code;
  }

  get brand(): string {
    return this.props.brand;
  }

  set brand(value: string) {
    this.props.brand = value;
  }

  get model(): string {
    return this.props.model;
  }

  set model(value: string) {
    this.props.model = value;
  }

  get taskTypes(): string[] {
    return this.props.taskTypes;
  }


  private constructor(props: RobotTypeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: RobotTypeProps, id?: UniqueEntityID): Result<RobotType> {

    const guardedProps = [
      { argument: props.code, argumentName: 'code' },
      { argument: props.brand, argumentName: 'brand' },
      { argument: props.model, argumentName: 'model' },
      { argument: props.taskTypes, argumentName: 'taskTypes' },

    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<RobotType>(guardResult.message)
    }
    else {
      const robotType = new RobotType({
        ...props
      }, id);

      return Result.ok<RobotType>(robotType);
    }
  }
}
