import { Guid } from "guid-typescript";

export interface BookingProps {
  id: Guid;
  dateFrom: Date;
  dateTo: Date;
}

export abstract class Booking {
  id: Guid;

  dateFrom: Date;

  dateTo: Date;
}
