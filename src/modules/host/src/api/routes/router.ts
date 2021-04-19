import { MiddlewareType } from "@travelhoop/infrastructure-types";
import express, { Router } from "express";
import { couchApi } from "./couch.router";

export const createRouter = ({ auth }: { auth: MiddlewareType }): Router => {
  const router = express.Router();

  router.post("/couch", auth, couchApi("create"));

  return router;
};
