import { DbConnection } from "@travelhoop/infrastructure";
import { Guid } from "guid-typescript";
import { User } from "../entities/user";
import { UserNotFoundError } from "../error/user-not-found.error";

interface UserRepositoryDependencies {
  dbConnection: DbConnection;
}
export class UserRepository {
  constructor(private readonly deps: UserRepositoryDependencies) {}

  async add(user: User): Promise<void> {
    await this.deps.dbConnection.em.persistAndFlush(user);
  }

  async get(id: Guid) {
    const user = await this.deps.dbConnection.em.getRepository(User).findOne({ id }, { profile: true });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.deps.dbConnection.em.getRepository(User).findOne({ email }, { profile: true });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.deps.dbConnection.em.getRepository(User).findOne({ email });
  }
}
