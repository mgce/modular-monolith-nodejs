import { hash } from "bcryptjs";

export const hashPassword = (password: string) => {
  return hash(password, 12);
};
