import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { GuidType } from "@travelhoop/infrastructure";
import { Guid } from "guid-typescript";

@Entity()
export class ReviewDetails {
  @PrimaryKey({ type: GuidType })
  id: Guid;

  @Property()
  comment: string;

  @Property()
  rate: number;

  @Property()
  fullfiledAt: Date = new Date();

  static create(data: Partial<ReviewDetails>) {
    const model = new ReviewDetails();

    Object.assign(model, data);

    return model;
  }
}
