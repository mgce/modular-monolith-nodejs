import { expect } from "chai";
import { CouchBookingStatusChanged, RequestStatus } from "../couch-booking-request";
import { createCouchBookingRequest } from "./helpers/create-couch-booking-request";

describe("Aggregate - Couch booking request", () => {
  context("Accept", () => {
    it("accept booking request", () => {
      const bookingRequest = createCouchBookingRequest();

      bookingRequest.accept();

      const { events } = bookingRequest;

      expect(events).length(1);
      expect(events[0]).instanceOf(CouchBookingStatusChanged);

      const { payload } = events[0] as CouchBookingStatusChanged;

      expect(payload.status).to.be.equal(RequestStatus.Accepted);
      expect(payload.couchBookingRequestId).to.be.equal(bookingRequest.id);
      expect(payload.rejectionReason).to.be.undefined!;
    });

    it("throw an error when try to accept twice", () => {
      const bookingRequest = createCouchBookingRequest();

      bookingRequest.accept();

      expect(bookingRequest.accept).to.throw();
    });

    it("throw an error when try to reject after accept", () => {
      const bookingRequest = createCouchBookingRequest();

      bookingRequest.reject("some reason");

      expect(bookingRequest.accept).to.throw();
    });
  });
  context("Reject", () => {
    it("reject booking request", () => {
      const bookingRequest = createCouchBookingRequest();
      const reason = "Some reject reason";

      bookingRequest.reject(reason);

      const { events } = bookingRequest;

      expect(events).length(1);
      expect(events[0]).instanceOf(CouchBookingStatusChanged);

      const { payload } = events[0] as CouchBookingStatusChanged;

      expect(payload.status).to.be.equal(RequestStatus.Rejected);
      expect(payload.couchBookingRequestId).to.be.equal(bookingRequest.id);
      expect(payload.rejectionReason).to.be.equal(reason);
    });

    it("throw an error when try to reject twice", () => {
      const bookingRequest = createCouchBookingRequest();

      bookingRequest.reject("some error");

      expect(() => bookingRequest.reject("some error")).to.throw();
    });

    it("throw an error when try to reject after accept", () => {
      const bookingRequest = createCouchBookingRequest();

      bookingRequest.accept();

      expect(() => bookingRequest.reject("some error")).to.throw();
    });
  });
});
