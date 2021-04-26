import { EntitySchema } from "@mikro-orm/core";
import { AggregateRoot } from "@travelhoop/shared-kernel";
import { BookableCouchProps, BookableCouch } from "../../../domain";

export const bookableCouchEntitySchema = new EntitySchema<BookableCouchProps, AggregateRoot>({
  name: "BookableCouch",
  class: BookableCouch as any,
  extends: "AggregateRoot",
  properties: { quantity: { type: "number" } },
});
