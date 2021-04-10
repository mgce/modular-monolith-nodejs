import { DbConnection } from "@travelhoop/infrastructure-types";
import { Guid } from "guid-typescript";
import { User } from "../entities/user";

interface UserRepositoryDependencies {
  dbConnection: DbConnection;
}
export class UserRepository {
  constructor(private readonly deps: UserRepositoryDependencies) {}

  async add(user: User): Promise<void> {
    await this.deps.dbConnection.em.persistAndFlush(user);
  }

  async get(id: Guid) {
    return this.deps.dbConnection.em.getRepository(User).findOne({ id });
  }
}
