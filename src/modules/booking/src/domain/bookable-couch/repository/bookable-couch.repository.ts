import { AggregateId } from "@travelhoop/shared-kernel";
import { BookableCouch } from "../entity/bookable-couch";

export interface BookableCouchRepository {
  get: (id: AggregateId) => Promise<BookableCouch>;
  add: (bookableCouch: BookableCouch) => Promise<void>;
}
