import { Logger } from "@travelhoop/infrastructure-types";
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

export const errorHandler = ({ logger }: ErrorHandlerDependencies) => (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(err.toString());

  if (Array.isArray(err)) {
    return res.status(400).json(handleClassValidator(err));
  }

  return res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
};
