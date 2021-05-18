import { AggregateId, AggregateRoot } from "@travelhoop/shared-kernel";
import { Guid } from "guid-typescript";
import { CouchBookingRequestCreated } from "../event/couch-booking-request-created.event";
import { CouchBookingStatusChanged } from "../event/couch-booking-status-changed.event";
import { RequestStatus } from "./request-status";

export interface CouchBookingRequestProps {
  id: AggregateId;
  bookableCouchId: AggregateId;
  guestId: Guid;
  dateFrom: Date;
  dateTo: Date;
  quantity: number;
  status: RequestStatus;
  decisionDate?: Date;
  rejectionReason?: string;
}

export type CreateCouchBookingRequest = Omit<CouchBookingRequestProps, "status" | "decisionDate" | "rejectionReason">;

export class CouchBookingRequest extends AggregateRoot {
  private bookableCouchId: AggregateId;

  private guestId: Guid;

  private dateFrom: Date;

  private dateTo: Date;

  private quantity: number;

  private status: RequestStatus;

  private decisionDate?: Date;

  private rejectionReason?: string;

  static create(props: CreateCouchBookingRequest) {
    const currentDate = new Date();
    if (props.dateFrom > props.dateTo || currentDate > props.dateFrom) {
      throw new Error("Booking request date must be from the future. Date to must be greater than date from");
    }

    return new CouchBookingRequest(props);
  }

  private constructor(props: CreateCouchBookingRequest) {
    super();
    this.id = props.id;
    this.bookableCouchId = props.bookableCouchId;
    this.guestId = props.guestId;
    this.dateFrom = props.dateFrom;
    this.dateTo = props.dateTo;
    this.quantity = props.quantity;
    this.status = RequestStatus.Pending;
    this.addEvent(new CouchBookingRequestCreated({ couchBookingRequestId: this.id }));
  }

  accept() {
    this.guestId = Guid.create();
    this.changeStatus(RequestStatus.Accepted);
  }

  reject(rejectionReason: string) {
    this.changeStatus(RequestStatus.Rejected, rejectionReason);
  }

  toDto(): CouchBookingRequestProps {
    return {
      id: this.id,
      bookableCouchId: this.bookableCouchId,
      guestId: this.guestId,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      quantity: this.quantity,
      status: this.status,
      decisionDate: this.decisionDate,
      rejectionReason: this.rejectionReason,
    };
  }

  private changeStatus(status: RequestStatus, rejectionReason?: string) {
    if (this.status !== RequestStatus.Pending) {
      throw new Error(`Cannot accept this booking request because current state is ${this.status}`);
    }

    this.status = status;
    this.rejectionReason = rejectionReason;
    this.decisionDate = new Date();
    this.addEvent(
      new CouchBookingStatusChanged({
        couchBookingRequestId: this.id,
        status: this.status,
        decisionDate: this.decisionDate,
        rejectionReason: this.rejectionReason,
      }),
    );
  }
}
