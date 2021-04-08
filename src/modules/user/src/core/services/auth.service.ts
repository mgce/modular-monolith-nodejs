import { Guid } from "guid-typescript";
import { RegisterDto } from "../dto/user.dto";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";

interface AuthServiceDependencies {
  userRepository: UserRepository;
}

export class AuthService {
  constructor(private readonly deps: AuthServiceDependencies) {}

  async register(dto: RegisterDto) {
    const id = Guid.create();

    console.log("dto", dto);

    const user = User.create({
      id,
      email: dto.email.toLowerCase(),
      password: dto.password,
      isActive: true,
      createdAt: new Date(),
    });

    await this.deps.userRepository.add(user);
  }
}
