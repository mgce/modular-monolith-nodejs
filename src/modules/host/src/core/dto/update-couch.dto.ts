import { IsString, IsNumber, Min } from "class-validator";

export class UpdateCouchDto {
  couchId: string;

  hostId: string;

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
