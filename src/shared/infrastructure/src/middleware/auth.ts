import { Logger } from "@travelhoop/infrastructure-types";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface AuthDependencies {
  logger: Logger;
  secretKey: string;
}

export const auth = ({ secretKey }: AuthDependencies) => (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    throw new Error("Invalid token");
  }

  verify(token, secretKey);

  next();
};
