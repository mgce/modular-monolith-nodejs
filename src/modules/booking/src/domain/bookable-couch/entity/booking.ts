import { Guid } from "guid-typescript";

export interface BookingProps {
  id: Guid;
  dateFrom: Date;
  dateTo: Date;
}

export abstract class Booking {
  private Id: Guid;

  private dateFrom: Date;

  private dateTo: Date;
}
