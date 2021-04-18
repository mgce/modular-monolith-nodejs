import { Guid } from "guid-typescript";
import { Entity, OneToMany, PrimaryKey } from "@mikro-orm/core";
import { GuidType } from "@travelhoop/infrastructure";
import { Couch } from "./couch";

@Entity()
export class Host {
  @PrimaryKey({ type: GuidType })
  id: Guid;

  @OneToMany(() => Couch, couch => couch.host)
  createdAt: Couch[];

  static create(data: Partial<Host>) {
    const model = new Host();

    Object.assign(model, data);

    return model;
  }
}
