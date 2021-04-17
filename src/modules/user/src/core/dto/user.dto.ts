export class UserDto {
  id: string;

  email: string;

  isActive: boolean;

  createdAt: Date;

  profile: {
    firstName?: string;

    lastName?: string;

    location?: string;

    aboutMe?: string;
  };

  constructor(props: UserDto) {
    Object.assign(this, props);
  }
}
