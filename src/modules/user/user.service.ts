import { AppDataSource } from "../../config/data-source";
import { comparePassword, hashPassword } from "../../utils/hash";
import { generateTokens } from "../../utils/jwt";
import { User } from "./user.entity";

const repo = AppDataSource.getRepository(User);

export class AccountService {
  async register(email: string, password: string) {
    const exists = await repo.findOneBy({ email });
    if (exists) throw new Error("Account already exists");

    const user = repo.create({
      email,
      password: await hashPassword(password),
    });

    await repo.save(user);
    return generateTokens(user.id);
  }

  async login(email: string, password: string) {
    const user = await repo.findOneBy({ email });
    if (!user) throw new Error("Invalid credentials");

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    return generateTokens(user.id);
  }

  async getProfile(userId: string) {
    const user = await repo.findOneBy({ id: userId });
    if (!user) throw new Error("Account not found");

    return {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async updateProfile(
    userId: string,
    data: Partial<Pick<User, "email" | "name">>
  ) {
    const user = await repo.findOneBy({ id: userId });
    if (!user) throw new Error("Account not found");

    Object.assign(user, data);
    await repo.save(user);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    const user = await repo.findOneBy({ id: userId });
    if (!user) throw new Error("Account not found");

    const isValid = await comparePassword(oldPassword, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    user.password = await hashPassword(newPassword);
    await repo.save(user);

    return { message: "Password updated successfully" };
  }
}
