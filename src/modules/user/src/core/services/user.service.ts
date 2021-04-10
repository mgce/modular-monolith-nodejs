import { Guid } from "guid-typescript";
import { RegisterDto } from "../dto/register.dto";
import { UserDto } from "../dto/user.dto";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";

interface UserServiceDependencies {
  userRepository: UserRepository;
}

export class UserService {
  constructor(private readonly deps: UserServiceDependencies) {}

  async register(dto: RegisterDto) {
    const id = Guid.create();

    const user = User.create({
      id,
      email: dto.email.toLowerCase(),
      password: dto.password,
      isActive: true,
      createdAt: new Date(),
    });

    await this.deps.userRepository.add(user);
  }

  async get(id: Guid) {
    const user = await this.deps.userRepository.get(id);

    if (!user) {
      throw new Error("User doesn't exists");
    }

    return new UserDto({
      id: user.id.toString(),
      email: user.email,
      password: user.password,
      isActive: user.isActive,
      createdAt: user.createdAt,
    });
  }
}
