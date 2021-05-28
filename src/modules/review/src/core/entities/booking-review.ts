import { Entity, PrimaryKey, Property, OneToOne } from "@mikro-orm/core";
import { GuidType } from "@travelhoop/infrastructure";
import { Guid } from "guid-typescript";
import { ReviewDetails } from "./review-details";

@Entity()
export class BookingReview {
  @PrimaryKey({ type: GuidType })
  id: Guid;

  @Property({ type: GuidType })
  reviewerId: Guid;

  @Property({ type: GuidType })
  revieweeId: Guid;

  @OneToOne({ fieldName: "reviewDetailsId", nullable: true })
  reviewDetails?: ReviewDetails;

  static create(data: Partial<BookingReview>) {
    const model = new BookingReview();

    Object.assign(model, data);

    return model;
  }
}
