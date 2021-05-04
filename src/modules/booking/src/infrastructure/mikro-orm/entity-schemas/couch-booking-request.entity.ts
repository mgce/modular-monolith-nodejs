import { GuidType } from "@travelhoop/infrastructure";
import { EntitySchema } from "@mikro-orm/core";
import { AggregateRoot } from "@travelhoop/shared-kernel";
import { AggregateIdType } from "@travelhoop/infrastructure";
import { CouchBookingRequestProps, CouchBookingRequest, RequestStatus } from "../../../domain";

export const couchBookingRequestEntitySchema = new EntitySchema<CouchBookingRequestProps, AggregateRoot>({
  name: "CouchBookingRequest",
  class: CouchBookingRequest as any,
  extends: "AggregateRoot",
  properties: {
    bookableCouchId: { type: AggregateIdType },
    guestId: { type: GuidType },
    quantity: { type: "number" },
    dateFrom: { type: Date },
    dateTo: { type: Date },
    decisionDate: { type: Date, nullable: true },
    status: { enum: true, items: () => RequestStatus },
    rejectionReason: { type: "string", nullable: true },
  },
});
