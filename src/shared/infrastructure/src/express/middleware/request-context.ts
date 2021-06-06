import { RequestContext } from "@mikro-orm/core";
import { NextFunction, Request, Response } from "express";
import { DbConnection } from "../../mikro-orm";

export const requestContext =
  ({ dbConnection }: { dbConnection: DbConnection }) =>
  (_req: Request, _res: Response, next: NextFunction) => {
    RequestContext.create(dbConnection.em, next);
  };
