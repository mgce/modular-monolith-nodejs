import { EntitySchema } from "@mikro-orm/core";
import { AggregateRoot } from "@travelhoop/shared-kernel";
import { AggregateIdType } from "../types/aggregate-id";

export const aggregateRootEntitySchema = new EntitySchema<AggregateRoot>({
  name: "AggregateRoot",
  abstract: true,
  properties: {
    id: { type: AggregateIdType, primary: true },
    version: { type: "number", default: 1, version: true },
    events: { type: "array", persist: false, default: [] },
  },
});
