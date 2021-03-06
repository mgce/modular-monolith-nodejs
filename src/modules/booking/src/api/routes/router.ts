import { MiddlewareType } from "@travelhoop/infrastructure";
import express, { Router } from "express";
import { bookableCouchApi } from "./bookable-couch.router";
import { couchBookingRequestApi } from "./couch-booking-request.router";

export const createRouter = ({
  auth,
  checkSchedulerToken,
}: {
  auth: MiddlewareType;
  checkSchedulerToken: MiddlewareType;
}): Router => {
  const router = express.Router();

  router.post("/request-booking", auth, bookableCouchApi("requestCouchBooking"));
  router.post("/create-booking", auth, bookableCouchApi("createBooking"));
  router.post("/finish-bookings", auth, bookableCouchApi("finishBookings"));
  router.post("/archive", auth, bookableCouchApi("archive"));
  router.post("/reject-booking-request", checkSchedulerToken, couchBookingRequestApi("rejectRequest"));

  return router;
};
