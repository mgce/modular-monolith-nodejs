import { Logger } from "@travelhoop/infrastructure-types";
import { NextFunction, Request, Response } from "express";

interface SchedulerTokenDependencies {
  logger: Logger;
  schedulerToken: string;
}

export const checkSchedulerToken =
  ({ schedulerToken }: SchedulerTokenDependencies) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers["x-scheduler-token"];

    if (!token || token !== schedulerToken) {
      throw new Error("Invalid token");
    }

    next();
  };
