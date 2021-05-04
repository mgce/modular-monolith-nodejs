import { GuidType } from "@travelhoop/infrastructure";
import { EntitySchema } from "@mikro-orm/core";
import { AggregateRoot } from "@travelhoop/shared-kernel";
import { BookableCouchProps, BookableCouch, Booking } from "../../../domain";

export const bookableCouchEntitySchema = new EntitySchema<BookableCouchProps, AggregateRoot>({
  name: "BookableCouch",
  class: BookableCouch as any,
  extends: "AggregateRoot",
  properties: {
    quantity: { type: "number" },
    hostId: { type: GuidType },
    bookings: { reference: "1:m", entity: () => Booking, mappedBy: booking => booking.bookableCouch },
  },
});
