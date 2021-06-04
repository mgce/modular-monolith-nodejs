import { AwilixContainer } from "awilix";
import { AuthenticatedUser } from "../auth/user";
import { DbConnection } from "../database/db-connection";

declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare global {
  namespace NodeJS {
    interface Global {
      container: AwilixContainer;
      dbConnection: DbConnection;
    }
  }
  namespace express {
    interface Request {
      user: AuthenticatedUser;
    }
  }
}
