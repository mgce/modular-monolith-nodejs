import { Guid } from "guid-typescript";

export interface CouchBookingRequestProps {
  id: Guid;
  guestId: Guid;
  dateFrom: Date;
  dateTo: Date;
  quantity: number;
}

export class CouchBookingRequest {
  id: Guid;

  guestId: Guid;

  dateFrom: Date;

  dateTo: Date;

  quantity: number;

  static create(props: CouchBookingRequestProps) {
    return new CouchBookingRequest(props);
  }

  private constructor(props: CouchBookingRequestProps) {
    this.id = props.id;
    this.guestId = props.guestId;
    this.dateFrom = props.dateFrom;
    this.dateTo = props.dateTo;
  }
}
