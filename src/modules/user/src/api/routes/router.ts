import express, { Router } from "express";
import { MiddlewareType } from "@travelhoop/infrastructure-types";
import { userApi } from "./user.router";

export interface RoutingDependencies {
  userRouting: express.Router;
}

export const createRouter = ({ auth }: { auth: MiddlewareType }): Router => {
  const router = express.Router();

  router.post("/register", userApi("register"));
  router.post("/login", userApi("login"));
  router.get("/:id", userApi("get"));
  router.put("/:id", auth, userApi("update"));

  return router;
};
