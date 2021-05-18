import { expect } from "chai";
import { addDays } from "date-fns";
import { Guid } from "guid-typescript";
import { anything, instance, mock, reset, verify, when } from "ts-mockito";
import { AggregateId } from "@travelhoop/shared-kernel";
import { CouchBookingRequestDomainService } from "..";
import { MikroOrmBookableCouchRepository } from "../../infrastructure/mikro-orm/repositories/bookable-couch.repository";
import { MikroOrmCouchBookingRequestRepository } from "../../infrastructure/mikro-orm/repositories/couch-booking-request.repository";
import { BookableCouch } from "../bookable-couch/entity/bookable-couch";

const bookableCouchRepositoryMock = mock(MikroOrmBookableCouchRepository);
const couchBookingRequestRepositoryMock = mock(MikroOrmCouchBookingRequestRepository);

describe("Couch booking request domain service", () => {
  beforeEach(() => {
    reset(bookableCouchRepositoryMock);
    reset(couchBookingRequestRepositoryMock);
  });

  context("Create", () => {
    it("create a request booking", async () => {
      const bookableCouch = BookableCouch.create({
        id: Guid.create(),
        hostId: Guid.create(),
        quantity: 2,
      });

      when(bookableCouchRepositoryMock.get(anything())).thenResolve(bookableCouch);

      const couchBookingRequestDomainService = new CouchBookingRequestDomainService({
        bookableCouchRepository: instance(bookableCouchRepositoryMock),
        couchBookingRequestRepository: instance(couchBookingRequestRepositoryMock),
      });

      await couchBookingRequestDomainService.createRequest({
        quantity: 2,
        dateFrom: addDays(new Date(), 1),
        dateTo: addDays(new Date(), 3),
        bookableCouchId: bookableCouch.id,
        guestId: Guid.create(),
      });

      verify(bookableCouchRepositoryMock.get(anything())).calledBefore(
        couchBookingRequestRepositoryMock.add(anything()),
      );
    });

    it("cannot create request booking if dates are from past", async () => {
      const bookableCouch = BookableCouch.create({
        id: Guid.create(),
        hostId: Guid.create(),
        quantity: 2,
      });

      when(bookableCouchRepositoryMock.get(anything())).thenResolve(bookableCouch);

      const couchBookingRequestDomainService = new CouchBookingRequestDomainService({
        bookableCouchRepository: instance(bookableCouchRepositoryMock),
        couchBookingRequestRepository: instance(couchBookingRequestRepositoryMock),
      });

      try {
        await couchBookingRequestDomainService.createRequest({
          quantity: 2,
          dateFrom: addDays(new Date(), -1),
          dateTo: addDays(new Date(), -3),
          bookableCouchId: AggregateId.create(),
          guestId: Guid.create(),
        });
      } catch (err) {
        expect(err).to.not.be.undefined!;
      }
    });

    it("cannot create request booking if date from is greater than date to", async () => {
      const bookableCouch = BookableCouch.create({
        id: Guid.create(),
        hostId: Guid.create(),
        quantity: 2,
      });

      when(bookableCouchRepositoryMock.get(anything())).thenResolve(bookableCouch);

      const couchBookingRequestDomainService = new CouchBookingRequestDomainService({
        bookableCouchRepository: instance(bookableCouchRepositoryMock),
        couchBookingRequestRepository: instance(couchBookingRequestRepositoryMock),
      });

      try {
        await couchBookingRequestDomainService.createRequest({
          quantity: 2,
          dateFrom: addDays(new Date(), 4),
          dateTo: addDays(new Date(), 1),
          bookableCouchId: AggregateId.create(),
          guestId: Guid.create(),
        });
      } catch (err) {
        expect(err).to.not.be.undefined!;
      }
    });

    it("cannot create request booking if guestId is equal hostId", async () => {
      const hostId = Guid.create();

      const bookableCouch = BookableCouch.create({
        id: Guid.create(),
        hostId,
        quantity: 2,
      });

      when(bookableCouchRepositoryMock.get(anything())).thenResolve(bookableCouch);

      const couchBookingRequestDomainService = new CouchBookingRequestDomainService({
        bookableCouchRepository: instance(bookableCouchRepositoryMock),
        couchBookingRequestRepository: instance(couchBookingRequestRepositoryMock),
      });

      try {
        await couchBookingRequestDomainService.createRequest({
          quantity: 2,
          dateFrom: addDays(new Date(), 4),
          dateTo: addDays(new Date(), 1),
          bookableCouchId: AggregateId.create(),
          guestId: hostId,
        });
      } catch (err) {
        expect(err).to.not.be.undefined!;
      }
    });
  });
});
