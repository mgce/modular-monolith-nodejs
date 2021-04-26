import { AggregateRoot, AggregateId } from "@travelhoop/shared-kernel";

export interface BookableCouchProps {
  id: AggregateId;
  quantity: number;
}

export class BookableCouch extends AggregateRoot {
  private quantity: number;
}
