import { IsString, IsNumber, Min, IsDefined } from "class-validator";

export class UpdateCouchDto {
  @IsDefined()
  id: string;

  @IsDefined()
  userId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  rooms: number;

  constructor(props: UpdateCouchDto) {
    Object.assign(this, props);
  }
}
