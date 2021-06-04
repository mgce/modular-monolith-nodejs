import { MiddlewareType } from "@travelhoop/abstract-core";
import express, { Router } from "express";
import { bookingReviewApi } from "./booking-review.router";

export const createRouter = ({ auth }: { auth: MiddlewareType }): Router => {
  const router = express.Router();

  router.post("/booking-review/:id", auth, bookingReviewApi("update"));
  router.get("/booking-review/:bookingReviewId", auth, bookingReviewApi("getById"));

  return router;
};
