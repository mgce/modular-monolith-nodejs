import { User } from "../entities/user";

export class UserRepository {
  private memory: User[] = [];

  async add(user: User): Promise<void> {
    this.memory.push(user);
    await Promise.resolve();
  }
}
