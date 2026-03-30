import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, env.jwt.accessSecret, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, env.jwt.rereshSecret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
