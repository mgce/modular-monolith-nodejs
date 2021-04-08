import { Request, Response } from "express";
import { makeInvoker } from "awilix-express";
import { validateOrReject } from "class-validator";
import { RegisterDto } from "../../core/dto/user.dto";
import { AuthService } from "../../core/services/auth.service";

interface UserApiDependencies {
  authService: AuthService;
}
const api = ({ authService }: UserApiDependencies) => ({
  register: async (req: Request, res: Response) => {
    const dto = new RegisterDto(req.body);
    await validateOrReject(dto);
    res.json(authService.register(dto));
  },
});

export const userApi = makeInvoker(api);
