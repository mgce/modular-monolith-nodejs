import { Logger, TravelhoopError } from "@travelhoop/abstract-core";
import { Request, Response, NextFunction } from "express";

interface ErrorHandlerDependencies {
  logger: Logger;
}
interface ValidationError {
  property: string;
  constraints: Record<string, string>;
}

const handleClassValidator = (err: ValidationError[]) => {
  return err;
};

export const errorHandler =
  ({ logger }: ErrorHandlerDependencies) =>
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err.toString());

    if (Array.isArray(err)) {
      return res.status(400).json(handleClassValidator(err));
    }

    if (err instanceof TravelhoopError) {
      return res.status(err.statusCode).json({
        error: err.message,
        stack: err.stack,
      });
    }

    return res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  };
