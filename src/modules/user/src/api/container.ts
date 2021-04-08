import { ContainerBuilder } from "@travelhoop/infrastructure";
import { asClass } from "awilix";
import { createRouter } from "./routes/router";
import { AuthService } from "../core/services/auth.service";
import { UserRepository } from "../core/repositories/user.repository";

export const createContainer = () =>
  new ContainerBuilder().addRouting(createRouter).register({
    authService: asClass(AuthService),
    userRepository: asClass(UserRepository),
  });
