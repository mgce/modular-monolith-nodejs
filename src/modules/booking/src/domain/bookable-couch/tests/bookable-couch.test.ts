import { addDays } from "date-fns";
import { Guid } from "guid-typescript";
import { describe } from "mocha";
import { expect } from "chai";
import { BookableCouch } from "../entity/bookable-couch";
import { CouchBookingRequestProps } from "../entity/couch-booking-request";
import { CouchBookingRequestCreated } from "../event/couch-booking-request-created.event";

describe("Bookable couch aggregate", () => {
  context("Booking request", () => {
    it("create a request booking", () => {
      const bookableCouch = BookableCouch.create({
        hostId: Guid.create(),
        id: Guid.create(),
        quantity: 2,
      });

      const bookingRequest: CouchBookingRequestProps = {
        id: Guid.create(),
        dateFrom: new Date(),
        dateTo: addDays(new Date(), 5),
        quantity: 1,
        guestId: Guid.create(),
      };

      bookableCouch.requestBooking(bookingRequest);

      expect(bookableCouch.events).length(1);
      expect(bookableCouch.events[0]).instanceOf(CouchBookingRequestCreated);
      expect((bookableCouch.events[0] as CouchBookingRequestCreated).payload.id).to.be.deep.equal(bookingRequest.id);
    });

    it("throws error if guestId is equal hostId", () => {
      const hostId = Guid.create();

      const bookableCouch = BookableCouch.create({
        hostId,
        id: Guid.create(),
        quantity: 2,
      });

      const bookingRequest: CouchBookingRequestProps = {
        id: Guid.create(),
        dateFrom: new Date(),
        dateTo: addDays(new Date(), 5),
        quantity: 1,
        guestId: hostId,
      };

      expect(() => bookableCouch.requestBooking(bookingRequest)).to.throw();
    });
  });
});
