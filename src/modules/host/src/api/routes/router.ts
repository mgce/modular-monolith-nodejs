import express, { Router } from "express";
import { couchApi } from "./couch.router";

export const createRouter = (): Router => {
  const router = express.Router();

  router.post("/couch", couchApi("create"));

  return router;
};
