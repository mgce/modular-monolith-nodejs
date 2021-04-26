import { Type } from "@mikro-orm/core";
import { AggregateId } from "@travelhoop/shared-kernel";

export class AggregateIdType extends Type<AggregateId | undefined, string | undefined> {
  convertToDatabaseValue(value: AggregateId | undefined): string | undefined {
    if (!value) {
      return value;
    }

    return value.toString();
  }

  convertToJSValue(value: string | undefined): AggregateId | undefined {
    if (!value) {
      return undefined;
    }

    return AggregateId.parse(value);
  }

  getColumnType(): string {
    return "uuid";
  }
}
