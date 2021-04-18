import { Guid } from "guid-typescript";
import { Entity, Property, PrimaryKey, ManyToOne } from "@mikro-orm/core";
import { GuidType } from "@travelhoop/infrastructure";
import { Host } from "./host";

@Entity()
export class Couch {
  @PrimaryKey({ type: GuidType })
  id: Guid;

  @ManyToOne(() => Host, { fieldName: "hostId" })
  host: Host;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property()
  rooms: number;

  @Property()
  createdAt: Date;

  static create(data: Partial<Couch>) {
    const model = new Couch();

    Object.assign(model, data);

    return model;
  }
}
