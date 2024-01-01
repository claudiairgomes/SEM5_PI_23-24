import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Result } from '../core/logic/Result';
import { Guard } from '../core/logic/Guard';
import ISystemUserDTO from '../dto/ISystemUserDTO';

interface SystemUserProps {
  email: string;
  password: string;
  role: string;
}

export class SystemUser extends AggregateRoot<SystemUserProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get email(): string {
    return this.props.email; // Usei o email como código, ajuste conforme necessário
  }

  get role(): string {
    return this.props.role;
  }

  set password(value: string) {
    this.props.password = value;
  }

  set role(value: string) {
    this.props.role = value;
  }
  private constructor(props: SystemUserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: SystemUserProps, id?: UniqueEntityID): Result<SystemUser> {

    const guardedProps = [
      { argument: props.email, argumentName: 'email' },
      { argument: props.password, argumentName: 'password' },
      { argument: props.role, argumentName: 'role' },

    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<SystemUser>(guardResult.message)
    }
    else {
      const systemUser = new SystemUser({
        ...props
      }, id);

      return Result.ok<SystemUser>(systemUser);
    }
  }
}
