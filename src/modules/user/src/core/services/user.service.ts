import { MessageBroker } from "@travelhoop/infrastructure";
import { Guid } from "guid-typescript";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserDto } from "../dto/user.dto";
import { Profile } from "../entities/profile";
import { User } from "../entities/user";
import { InvalidEmailOrPasswordError } from "../error/invalid-email-or-password.error";
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

  async update(dto: UpdateUserDto) {
    const user = await this.deps.userRepository.get(Guid.parse(dto.id));

    if (!user) {
      throw new Error("User doesn't exists");
    }

    user.profile.firstName = dto.firstName;
    user.profile.lastName = dto.lastName;
    user.profile.location = dto.location;
    user.profile.aboutMe = dto.aboutMe;
  }

  async get(id: Guid) {
    const user = await this.deps.userRepository.get(id);

    return new UserDto({
      id: user.id.toString(),
      email: user.email,
      isActive: user.isActive,
      createdAt: user.createdAt,
      profile: {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        location: user.profile.location,
        aboutMe: user.profile.aboutMe,
      },
    });
  }

  async login(dto: LoginDto) {
    const user = await this.deps.userRepository.getByEmail(dto.email);

    const isPasswordCorrect = await this.deps.passwordManager.compare(dto.password, user.password);

    if (!isPasswordCorrect) {
      throw new InvalidEmailOrPasswordError();
    }

    return this.deps.authService.createToken(user.id);
  }
}
