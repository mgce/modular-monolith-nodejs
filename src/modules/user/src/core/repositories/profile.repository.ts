import { DbConnection } from "@travelhoop/infrastructure";
import { Profile } from "../entities/profile";

interface ProfileRepositoryDependencies {
  dbConnection: DbConnection;
}
export class ProfileRepository {
  constructor(private readonly deps: ProfileRepositoryDependencies) {}

  async add(profile: Profile): Promise<void> {
    await this.deps.dbConnection.em.persistAndFlush(profile);
  }
}
