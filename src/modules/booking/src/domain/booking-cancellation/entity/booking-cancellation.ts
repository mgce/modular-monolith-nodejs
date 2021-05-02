import { Guid } from "guid-typescript";
import { AggregateId, AggregateRoot } from "@travelhoop/shared-kernel";

export interface BookingCancellationProps {
  id: AggregateId;
  guestId: Guid;
  quantity: number;
  dateFrom: Date;
  dateTo: Date;
  reason: string;
}

export class BookingCancellation extends AggregateRoot {
  private guestId: Guid;

  private quantity: number;

  private dateFrom: Date;

  private dateTo: Date;

  private reason: string;

  static create(props: BookingCancellationProps) {
    return new BookingCancellation(props);
  }

  constructor({ id, guestId, quantity, dateFrom, dateTo, reason }: BookingCancellationProps) {
    super();
    this.id = id;
    this.guestId = guestId;
    this.quantity = quantity;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.reason = reason;
  }
}
