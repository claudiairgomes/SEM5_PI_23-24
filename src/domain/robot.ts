import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { RobotId } from "./robotId";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";


interface RobotProps {

  codRobot: string;
  name: string;
  type: string;
  serialNumber: string;
  description: string;

}

export class Robot extends AggregateRoot<RobotProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get robotId (): RobotId {
    return RobotId.caller(this.id)
  }

  get codRobot (): string {
    return this.props.codRobot;
  }

  get name (): string {
    return this.props.name;
  }

  get type (): string {
    return this.props.type;
  }

  get serialNumber (): string {
    return this.props.serialNumber;
  }

  get description (): string {
    return this.props.description;
  }

  private constructor (props: RobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: RobotProps, id?: UniqueEntityID): Result<Robot> {

    const guardedProps = [
      { argument: props.codRobot, argumentName: 'codRobot' },
      { argument: props.name, argumentName: 'name' },
      { argument: props.type, argumentName: 'type' },
      { argument: props.serialNumber, argumentName: 'serialNumber' },
      { argument: props.description, argumentName: 'description' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Robot>(guardResult.message)
    }
    else {
      const robot = new Robot({
        ...props
      }, id);

      return Result.ok<Robot>(robot);
    }
  }
}
