import { AuthenticatedUser } from "@travelhoop/abstract-core";
import { Guid } from "guid-typescript";
import { sign } from "jsonwebtoken";
import { addMinutes } from "date-fns";

interface AuthServiceDependencies {
  expiry: number;
  secretKey: string;
}

export class AuthService {
  constructor(private readonly deps: AuthServiceDependencies) {}

  createToken(userId: Guid) {
    const expiresIn = Math.floor(addMinutes(new Date(), this.deps.expiry).getTime() / 1000);
    const authUser: AuthenticatedUser = { id: userId, exp: expiresIn };
    return sign(authUser, this.deps.secretKey);
  }
}
