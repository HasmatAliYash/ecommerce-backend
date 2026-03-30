import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ messsage: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1] || "undefined";

  try {
    const decode = jwt.verify(token, env.jwt.accessSecret);
    (req as any).userId = (decode as any).userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
