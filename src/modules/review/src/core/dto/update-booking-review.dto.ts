import { IsString, IsNumber, Min, IsDefined, Max } from "class-validator";

export class UpdateBookingReviewDto {
  @IsDefined()
  id: string;

  @IsDefined()
  reviewerId: string;

  @IsString()
  comment: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  rate: number;

  constructor(props: UpdateBookingReviewDto) {
    Object.assign(this, props);
  }
}
