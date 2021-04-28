import { EntitySchema } from "@mikro-orm/core";
import { GuidType } from "@travelhoop/infrastructure";
import { CouchBooking } from "../../../domain/bookable-couch/entity/couch-booking";
import { BookingProps, CouchBookingProps } from "../../../domain";

export const couchBookingEntitySchema = new EntitySchema<CouchBookingProps, BookingProps>({
  name: "CouchBooking",
  class: CouchBooking as any,
  extends: "Booking",
  properties: {
    guestId: { type: GuidType },
    reservedQuantity: { type: "number" },
  },
});
