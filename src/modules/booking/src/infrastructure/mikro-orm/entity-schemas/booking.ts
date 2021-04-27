import { GuidType } from "@travelhoop/infrastructure";
import { EntitySchema } from "@mikro-orm/core";
import { BookingProps } from "../../../domain";

export const bookingEntitySchema = new EntitySchema<BookingProps>({
  name: "Booking",
  discriminatorColumn: "discr",
  discriminatorMap: {
    couchBooking: "CouchBooking",
    unavailableBooking: "UnavailableBooking",
  },
  properties: { id: { type: GuidType, primary: true }, dateFrom: { type: Date }, dateTo: { type: Date } },
});
