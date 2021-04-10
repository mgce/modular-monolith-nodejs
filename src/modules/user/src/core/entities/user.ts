import { Guid } from "guid-typescript";
import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { GuidType } from "@travelhoop/infrastructure";

@Entity()
export class User {
  @PrimaryKey({ type: GuidType })
  id: Guid;

  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  isActive: boolean;

  @Property()
  createdAt: Date;

  static create(data: Partial<User>) {
    const model = new User();

    Object.assign(model, data);

    return model;
  }
}
