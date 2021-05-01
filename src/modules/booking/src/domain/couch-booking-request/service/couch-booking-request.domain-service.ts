import { AggregateId } from "../../../../../../shared/kernel/build";
import { BookableCouchRepository } from "../../bookable-couch";
import { CouchBookingRequest, CouchBookingRequestProps } from "../entity/couch-booking-request";
import { CouchBookingRequestRepository } from "../repository/couch-booking-request.repository";

interface CouchBookingRequestDomainServiceDependencies {
  bookableCouchRepository: BookableCouchRepository;
  couchBookingRequestRepository: CouchBookingRequestRepository;
}

export class CouchBookingRequestDomainService {
  constructor(private readonly deps: CouchBookingRequestDomainServiceDependencies) {}

  async createRequest(props: Omit<CouchBookingRequestProps, "id">) {
    const bookableCouch = await this.deps.bookableCouchRepository.get(props.bookableCouchId);

    bookableCouch.canBook(props);

    const bookingRequest = CouchBookingRequest.create({ id: AggregateId.create(), ...props });

    await this.deps.couchBookingRequestRepository.add(bookingRequest);
  }
}
