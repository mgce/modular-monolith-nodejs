import { Type } from "@mikro-orm/core";
import { Guid } from "guid-typescript";

export class GuidType extends Type<Guid | undefined, string | undefined> {
  convertToDatabaseValue(value: Guid | undefined): string | undefined {
    if (!value) {
      return value;
    }

    return value.toString();
  }

  convertToJSValue(value: string | undefined): Guid | undefined {
    if (!value) {
      return undefined;
    }

    return Guid.parse(value);
  }

  getColumnType(): string {
    return "uuid";
  }
}
