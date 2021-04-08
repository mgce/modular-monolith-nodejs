import { Guid } from "guid-typescript";

export class User {
  id: Guid;

  email: string;

  password: string;

  isActive: boolean;

  createdAt: Date;

  static create(data: Partial<User>) {
    const model = new User();

    Object.assign(model, data);

    return model;
  }
}
