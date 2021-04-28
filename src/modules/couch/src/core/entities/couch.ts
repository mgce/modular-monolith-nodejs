import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { GuidType } from "@travelhoop/infrastructure";
import { Guid } from "guid-typescript";

@Entity()
export class Couch {
  @PrimaryKey({ type: GuidType })
  id: Guid;

  @Property({ type: GuidType })
  hostId: Guid;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property()
  quantity: number;

  @Property()
  createdAt: Date = new Date();

  static create(data: Partial<Couch>) {
    const model = new Couch();

    Object.assign(model, data);

    return model;
  }
}
