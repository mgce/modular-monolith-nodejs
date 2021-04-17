import { IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  id: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  location?: string;

  @IsString()
  aboutMe?: string;

  constructor(props: UpdateUserDto) {
    Object.assign(this, props);
  }
}
