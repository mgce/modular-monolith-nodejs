import { Request as ExpressRequest } from "express";
import { AuthenticatedUser } from "../auth";

export interface Request extends ExpressRequest {
  user?: AuthenticatedUser;
}
