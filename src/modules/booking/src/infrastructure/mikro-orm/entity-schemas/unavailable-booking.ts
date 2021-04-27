import { EntitySchema } from "@mikro-orm/core";
import { BookingProps } from "../../../domain";
import { UnavailableBookingProps, UnavailableBooking } from "../../../domain";

export const unavailableBookingEntitySchema = new EntitySchema<UnavailableBookingProps, BookingProps>({
  name: "UnavailableBooking",
  class: UnavailableBooking as any,
  extends: "Booking",
  properties: {},
});
