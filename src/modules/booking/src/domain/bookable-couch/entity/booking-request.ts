import { Guid } from "guid-typescript";
import { AggregateId, AggregateRoot } from "@travelhoop/shared-kernel";

export interface CouchBookingRequestProps {
  id: Guid;
  guestId: Guid;
  dateFrom: Date;
  dateTo: Date;
  quantity: number;
}

export class CouchBookingRequest extends AggregateRoot {
  guestId: Guid;

  dateFrom: Date;

  dateTo: Date;

  quantity: number;

  static create(props: CouchBookingRequestProps) {
    return new CouchBookingRequest(props);
  }

  private constructor(props: CouchBookingRequestProps) {
    super();
    this.id = AggregateId.create(props.id);
    this.guestId = props.guestId;
    this.dateFrom = props.dateFrom;
    this.dateTo = props.dateTo;
  }
}
