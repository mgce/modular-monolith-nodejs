import { Guid } from "guid-typescript";
import { Logger, AuthenticatedUser } from "@travelhoop/abstract-core";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface AuthDependencies {
  logger: Logger;
  secretKey: string;
}

export const auth =
  ({ secretKey }: AuthDependencies) =>
  (req: Request & { user?: AuthenticatedUser }, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      throw new Error("Invalid token");
    }

    try {
      const parsedToken = verify(token, secretKey) as any;
      const id = Guid.parse(parsedToken.id.value);

      // eslint-disable-next-line no-param-reassign
      req.user = {
        ...parsedToken,
        id,
      };
    } catch (err) {
      throw new Error("Invalid token");
    }

    next();
  };
