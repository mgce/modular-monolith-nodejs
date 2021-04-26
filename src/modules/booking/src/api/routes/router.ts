import { MiddlewareType } from "@travelhoop/infrastructure-types";
import express, { Router } from "express";

export const createRouter = ({ auth: _auth }: { auth: MiddlewareType }): Router => {
  const router = express.Router();

  return router;
};
