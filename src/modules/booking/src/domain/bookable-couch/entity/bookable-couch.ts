import { Guid } from "guid-typescript";
import { AggregateRoot, AggregateId } from "@travelhoop/shared-kernel";

export interface BookableCouchProps {
  id: AggregateId;
  quantity: number;
}

interface CreateBookableCouchProps {
  id: Guid;
  quantity: number;
}

export class BookableCouch extends AggregateRoot {
  private quantity: number;

  static create(props: CreateBookableCouchProps) {
    return new BookableCouch(props);
  }

  private constructor({ id, quantity }: CreateBookableCouchProps) {
    super();
    this.id = AggregateId.create(id);
    this.quantity = quantity;
  }
}
