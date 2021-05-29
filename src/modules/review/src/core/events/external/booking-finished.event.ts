import { Event } from "@travelhoop/infrastructure-types";

interface BookingFinishedPayload {
  id: string;
  guestId: string;
  hostId: string;
}

export class BookingFinished implements Event {
  name = this.constructor.name;

  constructor(public payload: BookingFinishedPayload) {}
}
