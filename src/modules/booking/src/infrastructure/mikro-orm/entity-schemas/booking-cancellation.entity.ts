import { GuidType } from "@travelhoop/infrastructure";
import { EntitySchema } from "@mikro-orm/core";
import { AggregateRoot } from "@travelhoop/shared-kernel";
import { BookingCancellation, BookingCancellationProps } from "../../../domain";

export const bookingCancellationEntitySchema = new EntitySchema<BookingCancellationProps, AggregateRoot>({
  name: "BookingCancellation",
  class: BookingCancellation as any,
  extends: "AggregateRoot",
  properties: {
    guestId: { type: GuidType },
    quantity: { type: "number" },
    dateFrom: { type: Date },
    dateTo: { type: Date },
    reason: { type: "string" },
  },
});
