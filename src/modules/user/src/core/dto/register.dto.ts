import { IsEmail, IsString } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  constructor(props: RegisterDto) {
    Object.assign(this, props);
  }
}
