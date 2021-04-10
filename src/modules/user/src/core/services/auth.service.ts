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
    const expiresIn = addMinutes(new Date(), this.deps.expiry);
    return sign({ userId, exp: expiresIn.getTime() }, this.deps.secretKey);
  }
}
