import { Guid } from "guid-typescript";
import { BookableCouch } from "./bookable-couch";

export interface BookingProps {
  id: Guid;
  dateFrom: Date;
  dateTo: Date;
  bookableCouch: BookableCouch;
}

export abstract class Booking {
  id: Guid;

  dateFrom: Date;

  dateTo: Date;

  bookableCouch: BookableCouch;
}
