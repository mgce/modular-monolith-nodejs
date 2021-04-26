import { MikroOrmRepository, MikroOrmRepositoryDependencies } from "@travelhoop/infrastructure";
import { BookableCouch, BookableCouchProps, BookableCouchRepository } from "../../../domain";
import { bookableCouchEntitySchema } from "../entity-schemas/bookable-couch.entity";

export class MikroOrmBookableCouchRepository
  extends MikroOrmRepository<BookableCouch, BookableCouchProps>
  implements BookableCouchRepository {
  constructor({ dbConnection }: MikroOrmRepositoryDependencies) {
    super({ dbConnection, entitySchema: bookableCouchEntitySchema });
  }

  async add(bookableCouch: BookableCouch) {
    await this.repo.persistAndFlush(bookableCouch);
  }
}
