import { AwilixContainer } from "awilix";
import { Request, Response } from "express";

export const scopePerRequest = (basePath: string, container: AwilixContainer) => (
  req: Request | any,
  _res: Response,
  next: Function,
) => {
  if (req.path.startsWith(basePath)) {
    // eslint-disable-next-line no-param-reassign
    req.container = container.createScope();
  }
  next();
};
