import { AggregateId } from "@travelhoop/shared-kernel";
import { MikroOrmRepository, MikroOrmRepositoryDependencies } from "@travelhoop/infrastructure";
import { BookableCouch, BookableCouchProps, BookableCouchRepository } from "../../../domain";
import { bookableCouchEntitySchema } from "../entity-schemas/bookable-couch.entity";

export class MikroOrmBookableCouchRepository
  extends MikroOrmRepository<BookableCouch, BookableCouchProps>
  implements BookableCouchRepository
{
  constructor({ dbConnection }: MikroOrmRepositoryDependencies) {
    super({ dbConnection, entitySchema: bookableCouchEntitySchema });
  }

  findWithFinishedBookings() {
    return this.repo.find({ bookings: { $ne: null } }, { populate: ["bookings"] }) as unknown as Promise<
      BookableCouch[]
    >;
  }

  async find(id: AggregateId) {
    return this.repo.findOne({ id }) as unknown as Promise<BookableCouch | null>;
  }

  async get(id: AggregateId) {
    return this.repo.findOneOrFail({ id }, ["bookings"]) as unknown as BookableCouch;
  }

  async add(bookableCouch: BookableCouch) {
    await this.repo.persistAndFlush(bookableCouch);
  }

  async save(bookableCouch: BookableCouch) {
    await this.repo.persistAndFlush(bookableCouch);
  }
}
