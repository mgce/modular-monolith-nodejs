import { Guid } from "guid-typescript";
import { Entity, Property, PrimaryKey, OneToOne } from "@mikro-orm/core";
import { GuidType } from "@travelhoop/infrastructure";
import { Profile } from "./profile";

@Entity()
export class User {
  @PrimaryKey({ type: GuidType })
  id: Guid;

  @OneToOne({ fieldName: "profileId" })
  profile: Profile;

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
