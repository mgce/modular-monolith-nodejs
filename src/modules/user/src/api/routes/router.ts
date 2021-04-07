import express, { Router } from "express";

export interface RoutingDependencies {
  userRouting: express.Router;
}

export const createRouter = ({ userRouting }: RoutingDependencies): Router => {
  const router = express.Router();

  router.use("/users", userRouting);

  return router;
};
