import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { GuidType } from "@travelhoop/infrastructure";
import { Guid } from "guid-typescript";

@Entity()
export class Profile {
  @PrimaryKey({ type: GuidType })
  id: Guid;

  @Property({ nullable: true })
  firstName?: string;

  @Property({ nullable: true })
  lastName?: string;

  @Property({ nullable: true })
  location?: string;

  @Property({ nullable: true })
  aboutMe?: string;

  static create(data: Partial<Profile>) {
    const model = new Profile();

    Object.assign(model, data);

    return model;
  }
}
