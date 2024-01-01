import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";



interface TaskTypeProps {
    name: string;
    description: string;
}

export class TaskType extends AggregateRoot<TaskTypeProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get name (): string {
        return this.props.name;
    }

    get description (): string {
        return this.props.description;
    }

    set description ( value: string ) {
        this.props.description = value;
    }


    private constructor (props: TaskTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

  public static create (props: TaskTypeProps, id?: UniqueEntityID): Result<TaskType> {

    const guardedProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.description, argumentName: 'description' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<TaskType>(guardResult.message)
    }
    else {
      const taskType = new TaskType({
        ...props
      }, id);

      return Result.ok<TaskType>(taskType);
    }
  }
}
