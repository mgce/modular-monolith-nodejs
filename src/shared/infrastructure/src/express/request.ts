import { AuthenticatedUser } from "@travelhoop/abstract-core";
import { Request as ExpressRequest } from "express";

export interface Request extends ExpressRequest {
  user?: AuthenticatedUser;
}
