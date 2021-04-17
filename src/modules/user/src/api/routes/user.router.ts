import { Request, Response } from "express";
import { makeInvoker } from "awilix-express";
import { validateOrReject } from "class-validator";
import asyncHandler from "express-async-handler";
import { Guid } from "guid-typescript";
import { RegisterDto } from "../../core/dto/register.dto";
import { UserService } from "../../core/services/user.service";
import { LoginDto } from "../../core/dto/login.dto";
import { UpdateUserDto } from "../../core/dto/update-user.dto";

interface UserApiDependencies {
  userService: UserService;
}

const api = ({ userService }: UserApiDependencies) => ({
  register: asyncHandler(async (req: Request, res: Response) => {
    const dto = new RegisterDto(req.body);
    await validateOrReject(dto);
    res.json(await userService.register(dto));
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const dto = new LoginDto(req.body);
    await validateOrReject(dto);
    res.json(await userService.login(dto));
  }),

  get: asyncHandler(async (req: Request, res: Response) => {
    res.json(await userService.get(Guid.parse(req.params.id)));
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const dto = new UpdateUserDto({ id: req.params.id, ...req.body });
    await validateOrReject(dto);
    res.json(await userService.update(dto));
  }),
});

export const userApi = makeInvoker(api);
