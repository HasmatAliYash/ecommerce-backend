import {
  registerSchema,
  updateProfileSchema,
  changePasswordSchema,
} from "./user.schema";
import { AccountService } from "./user.service";
import { Request, Response } from "express";

const accountService = new AccountService();

export class AccountController {
  async register(req: Request, res: Response) {
    const data = registerSchema.parse(req.body);
    const tokens = await accountService.register(data.email, data.password);
    res.json(tokens);
  }

  async login(req: Request, res: Response) {
    const data = registerSchema.parse(req.body);
    const tokens = await accountService.login(data.email, data.password);
    res.json(tokens);
  }

  async profile(req: any, res: Response) {
    const user = await accountService.getProfile(req.userId);
    res.json(user);
  }

  async updateProfile(req: any, res: Response) {
    const data: any = updateProfileSchema.parse(req.body);
    const user = await accountService.updateProfile(req.userId, data);
    res.json(user);
  }

  async changePassword(req: any, res: Response) {
    const data = changePasswordSchema.parse(req.body);
    const result = await accountService.changePassword(
      req.userId,
      data.oldPassword,
      data.newPassword
    );
    res.json(result);
  }
}
