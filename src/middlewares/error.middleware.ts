import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
  res.status(400).json({
    message: err.message || "Something went wrong",
  });
};
