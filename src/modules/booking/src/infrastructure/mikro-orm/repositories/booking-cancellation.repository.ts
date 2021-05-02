import { AggregateId } from "@travelhoop/shared-kernel";
import { MikroOrmRepository, MikroOrmRepositoryDependencies } from "@travelhoop/infrastructure";
import { BookingCancellation, BookingCancellationProps, BookingCancellationRepository } from "../../../domain";
import { bookingCancellationEntitySchema } from "../entity-schemas/booking-cancellation.entity";

export class MikroOrmBookingCancellationRepository
  extends MikroOrmRepository<BookingCancellation, BookingCancellationProps>
  implements BookingCancellationRepository {
  constructor({ dbConnection }: MikroOrmRepositoryDependencies) {
    super({ dbConnection, entitySchema: bookingCancellationEntitySchema });
  }

  async get(id: AggregateId) {
    return (this.repo.findOneOrFail({ id }) as unknown) as BookingCancellation;
  }

  async add(bookingCancellation: BookingCancellation) {
    await this.repo.persistAndFlush(bookingCancellation);
  }
}
