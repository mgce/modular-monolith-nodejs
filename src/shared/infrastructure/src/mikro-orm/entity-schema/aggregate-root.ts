import { EntitySchema } from "@mikro-orm/core";
import { AggregateId, AggregateRootProps } from "@travelhoop/shared-kernel";
import { AggregateIdType } from "../types/aggregate-id";

export const aggregateRootEntitySchema = new EntitySchema<AggregateRootProps<AggregateId>>({
  name: "AggregateRoot",
  abstract: true,
  properties: {
    id: { type: AggregateIdType, primary: true },
    version: { type: "number", default: 1, version: true },
    domainEvents: { type: "array", persist: false },
    versionIncremented: { type: "boolean", persist: false },
  },
});
