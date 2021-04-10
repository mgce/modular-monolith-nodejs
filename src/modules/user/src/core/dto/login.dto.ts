import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  constructor(props: LoginDto) {
    Object.assign(this, props);
  }
}
