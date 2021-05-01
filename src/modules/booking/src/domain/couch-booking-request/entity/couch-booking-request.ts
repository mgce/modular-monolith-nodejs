import { AggregateId, AggregateRoot } from "@travelhoop/shared-kernel";
import { Guid } from "guid-typescript";
import { CouchBookingRequestCreated } from "../event/couch-booking-request-created.event";

export interface CouchBookingRequestProps {
  id: AggregateId;
  bookableCouchId: AggregateId;
  guestId: Guid;
  dateFrom: Date;
  dateTo: Date;
  quantity: number;
}

export class CouchBookingRequest extends AggregateRoot {
  bookableCouchId: AggregateId;

  guestId: Guid;

  dateFrom: Date;

  dateTo: Date;

  quantity: number;

  static create(props: CouchBookingRequestProps) {
    return new CouchBookingRequest(props);
  }

  private constructor(props: CouchBookingRequestProps) {
    super();
    this.id = props.id;
    this.guestId = props.guestId;
    this.dateFrom = props.dateFrom;
    this.dateTo = props.dateTo;
    this.quantity = props.quantity;
    this.addEvent(new CouchBookingRequestCreated({ couchBookingRequestId: this.id }));
  }

  accept() {}
}
