import { AggregateId } from "../../../../../../shared/kernel/build";
import { BookableCouchRepository } from "../../bookable-couch";
import { CouchBookingRequest, CreateCouchBookingRequest } from "../entity/couch-booking-request";
import { CouchBookingRequestRepository } from "../repository/couch-booking-request.repository";

interface CouchBookingRequestDomainServiceDependencies {
  bookableCouchRepository: BookableCouchRepository;
  couchBookingRequestRepository: CouchBookingRequestRepository;
}

export class CouchBookingRequestDomainService {
  constructor(private readonly deps: CouchBookingRequestDomainServiceDependencies) {}

  async createRequest(bookingRequestProps: Omit<CreateCouchBookingRequest, "id">) {
    const bookableCouch = await this.deps.bookableCouchRepository.get(bookingRequestProps.bookableCouchId);

    bookableCouch.canBook(bookingRequestProps);

    const bookingRequest = CouchBookingRequest.create({ id: AggregateId.create(), ...bookingRequestProps });

    await this.deps.couchBookingRequestRepository.add(bookingRequest);
  }
}
