import { Guid } from "guid-typescript";

export interface AuthenticatedUser {
  id: Guid;
  exp: number;
}
