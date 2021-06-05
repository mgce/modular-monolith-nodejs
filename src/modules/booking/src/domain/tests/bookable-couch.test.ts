import { expect } from "chai";
import { addDays } from "date-fns";
import { Guid } from "guid-typescript";
import "mocha";
import {
  BookableCouch,
  BookableCouchArchived,
  CouchBookingCancellationPolicy,
  CouchBookingCancelled,
  CouchBookingCreated,
} from "../bookable-couch";
import { createCouchBookingRequest } from "./helpers/create-couch-booking-request";

describe("Aggregate - Bookable couch", () => {
  context("Create booking", () => {
    it("create booking", () => {
      const bookableCouch = BookableCouch.create({
        id: Guid.create(),
        hostId: Guid.create(),
        quantity: 2,
      });

      const { events } = bookableCouch;

      const bookingRequest = createCouchBookingRequest();

      bookableCouch.createBooking(bookingRequest.toDto());

      expect(events).length(1);
      expect(events[0]).instanceOf(CouchBookingCreated);

      const { payload } = events[0] as CouchBookingCreated;

      expect(payload.couchBookingRequestId).to.be.equal(bookingRequest.id);
    });

    it("cannot book if there is overlapping booking", () => {
      const bookableCouch = BookableCouch.create({
        id: Guid.create(),
        hostId: Guid.create(),
        quantity: 2,
      });

      bookableCouch.createBooking(createCouchBookingRequest().toDto());

      expect(() => bookableCouch.createBooking(createCouchBookingRequest().toDto())).to.throw();
    });

    it("cannot book if couch is archived", () => {
      const bookableCouch = BookableCouch.create({
        id: Guid.create(),
        hostId: Guid.create(),
        quantity: 2,
      });

      bookableCouch.archive();

      expect(() => bookableCouch.createBooking(createCouchBookingRequest().toDto())).to.throw();
    });
  });

  context("Cancel booking", () => {
    it("cancel booking", () => {
      const bookableCouch = BookableCouch.create({
        id: Guid.create(),
        hostId: Guid.create(),
        quantity: 2,
      });

      const reason = "Some reason";

      const bookingRequest = createCouchBookingRequest({
        dateFrom: addDays(new Date(), 5),
        dateTo: addDays(new Date(), 10),
      });

      bookableCouch.createBooking(bookingRequest.toDto());

      bookableCouch.clearEvents();

      bookableCouch.cancelBooking(
        bookingRequest.id.toGuid(),
        reason,
        new CouchBookingCancellationPolicy({ maxDaysBeforeCancellation: 1 }),
      );

      const { events } = bookableCouch;

      expect(events).length(1);
      expect(events[0]).instanceOf(CouchBookingCancelled);

      const { payload } = events[0] as CouchBookingCancelled;

      expect(payload.reason).to.be.equal(reason);
      expect(payload.couchBooking.id.toString()).to.be.equal(bookingRequest.id.toGuid().toString());
    });

    it("cannot cancell booking if maxDaysBeforeCancellation is greater than dateFrom", () => {
      const bookableCouch = BookableCouch.create({
        id: Guid.create(),
        hostId: Guid.create(),
        quantity: 2,
      });

      const bookingRequest = createCouchBookingRequest();

      bookableCouch.createBooking(bookingRequest.toDto());

      expect(() =>
        bookableCouch.cancelBooking(
          bookingRequest.id.toGuid(),
          "Some reason",
          new CouchBookingCancellationPolicy({ maxDaysBeforeCancellation: 1 }),
        ),
      ).to.throw();
    });
  });

  context("Archive couch", () => {
    it("archive couch", () => {
      const bookableCouch = BookableCouch.create({
        id: Guid.create(),
        hostId: Guid.create(),
        quantity: 2,
      });

      bookableCouch.clearEvents();

      bookableCouch.archive();

      const { events } = bookableCouch;

      expect(events).length(1);
      expect(events[0]).instanceOf(BookableCouchArchived);

      const { payload } = events[0] as BookableCouchArchived;

      expect(payload.bookableCouchId).to.be.equal(bookableCouch.id);
    });
    it("throw error when couch is already archived", () => {
      const bookableCouch = BookableCouch.create({
        id: Guid.create(),
        hostId: Guid.create(),
        quantity: 2,
      });

      bookableCouch.archive();

      expect(() => bookableCouch.archive()).to.throw();
    });
    it("throw error when couch has active bookings", () => {
      const bookableCouch = BookableCouch.create({
        id: Guid.create(),
        hostId: Guid.create(),
        quantity: 2,
      });

      const bookingRequest = createCouchBookingRequest();

      bookableCouch.createBooking(bookingRequest.toDto());

      expect(() => bookableCouch.archive()).to.throw();
    });
  });
});
