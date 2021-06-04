import { MiddlewareType } from "@travelhoop/abstract-core";
import express, { Router } from "express";
import { couchApi } from "./couch.router";

export const createRouter = ({ auth }: { auth: MiddlewareType }): Router => {
  const router = express.Router();

  router.post("/:id", auth, couchApi("update"));
  router.get("/:couchId", auth, couchApi("getById"));
  router.get("/", auth, couchApi("getByUserId"));
  router.post("/", auth, couchApi("create"));

  return router;
};
