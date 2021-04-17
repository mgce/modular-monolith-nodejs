import { MessageBroker } from "@travelhoop/infrastructure";
import { Guid } from "guid-typescript";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
import { UserDto } from "../dto/user.dto";
import { Profile } from "../entities/profile";
import { User } from "../entities/user";
import { UserCreated } from "../events/user-created.event";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";
import { PasswordManager } from "./password-hasher";

interface UserServiceDependencies {
  userRepository: UserRepository;
  passwordManager: PasswordManager;
  authService: AuthService;
  messageBroker: MessageBroker;
}

export class UserService {
  constructor(private readonly deps: UserServiceDependencies) {}

  async register(dto: RegisterDto) {
    const userId = Guid.create();
    const profileId = Guid.create();
    const password = await this.deps.passwordManager.hashPassword(dto.password);

    const profile = Profile.create({ id: profileId });

    const user = User.create({
      id: userId,
      profile,
      email: dto.email.toLowerCase(),
      password,
      isActive: true,
      createdAt: new Date(),
    });

    await this.deps.userRepository.add(user);

    await this.deps.messageBroker.publish(new UserCreated({ id: userId }));
  }

  async get(id: Guid) {
    const user = await this.deps.userRepository.get(id);

    if (!user) {
      throw new Error("User doesn't exists");
    }

    return new UserDto({
      id: user.id.toString(),
      email: user.email,
      isActive: user.isActive,
      createdAt: user.createdAt,
    });
  }

  async login(dto: LoginDto) {
    const user = await this.deps.userRepository.getByEmail(dto.email);

    if (!user) {
      throw new Error("User doesn't exists");
    }

    const isPasswordCorrect = await this.deps.passwordManager.compare(dto.password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid password");
    }

    return this.deps.authService.createToken(user.id);
  }
}
