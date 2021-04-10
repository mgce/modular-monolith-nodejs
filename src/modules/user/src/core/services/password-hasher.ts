import { hash, compare } from "bcryptjs";

export class PasswordManager {
  hashPassword(password: string) {
    return hash(password, 12);
  }

  compare(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }
}
