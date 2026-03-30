import winston from "winston";
import path from "path";

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
    }),
    new winston.transports.File({
      filename: path.join("logs", "app.log"),
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,
    }),
  ],
});
