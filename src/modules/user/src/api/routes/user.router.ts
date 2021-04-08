import { Request, Response } from "express";
import { makeInvoker } from "awilix-express";
import { validateOrReject } from "class-validator";
import asyncHandler from "express-async-handler";
import { RegisterDto } from "../../core/dto/user.dto";
import { AuthService } from "../../core/services/auth.service";

interface UserApiDependencies {
  authService: AuthService;
}
const api = ({ authService }: UserApiDependencies) => ({
  register: asyncHandler(async (req: Request, res: Response) => {
    const dto = new RegisterDto(req.body);
    await validateOrReject(dto);
    res.json(await authService.register(dto));
  }),
});

export const userApi = makeInvoker(api);
