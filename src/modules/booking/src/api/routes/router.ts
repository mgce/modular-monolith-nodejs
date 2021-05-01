import { MiddlewareType } from "@travelhoop/infrastructure-types";
import express, { Router } from "express";
import { bookableCouchApi } from "./bookable-couch.router";

export const createRouter = ({ auth }: { auth: MiddlewareType }): Router => {
  const router = express.Router();

  router.post("/request-booking", auth, bookableCouchApi("requestCouchBooking"));

  return router;
};
