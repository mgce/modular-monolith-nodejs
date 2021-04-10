export class UserDto {
  id: string;

  email: string;

  isActive: boolean;

  createdAt: Date;

  constructor(props: UserDto) {
    Object.assign(this, props);
  }
}
