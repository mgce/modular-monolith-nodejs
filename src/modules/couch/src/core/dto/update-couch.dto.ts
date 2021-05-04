import { IsString, IsNumber, Min, IsDefined } from "class-validator";

export class UpdateCouchDto {
  @IsDefined()
  id: string;

  @IsDefined()
  hostId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  constructor(props: UpdateCouchDto) {
    Object.assign(this, props);
  }
}
