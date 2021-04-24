import { Logger, AuthenticatedUser } from "@travelhoop/infrastructure-types";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface AuthDependencies {
  logger: Logger;
  secretKey: string;
}

export const auth = ({ secretKey }: AuthDependencies) => (
  req: Request & { user?: AuthenticatedUser },
  _res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    throw new Error("Invalid token");
  }

  const user = verify(token, secretKey) as AuthenticatedUser;

  // eslint-disable-next-line no-param-reassign
  req.user = user;

  next();
};
