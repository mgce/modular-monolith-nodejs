import express, { Router } from "express";
import { userApi } from "./user.router";

export interface RoutingDependencies {
  userRouting: express.Router;
}

export const createRouter = (): Router => {
  const router = express.Router();

  router.post("/register", userApi("register"));
  router.post("/login", userApi("login"));
  router.get("/:id", userApi("get"));

  return router;
};
