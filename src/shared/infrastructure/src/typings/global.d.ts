import { AuthenticatedUser } from "@travelhoop/abstract-core";
import { AwilixContainer } from "awilix";
import { DbConnection } from "..";

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
