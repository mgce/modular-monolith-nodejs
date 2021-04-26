import { BookableCouch } from "../entity/bookable-couch";

export interface BookableCouchRepository {
  add: (bookableCouch: BookableCouch) => Promise<void>;
}
