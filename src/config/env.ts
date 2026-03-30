import dotenv from "dotenv";

dotenv.config();
const accessSecret = process.env.JWT_ACCESS_SECRET;
if (!accessSecret) {
  throw new Error("Missing required env var: JWT_ACCESS_SECRET");
}

const rereshSecret = process.env.JWT_ACCESS_SECRET;
if (!rereshSecret) {
  throw new Error("Missing required env var: JWT_REFRESH_SECRET");
}
export const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  dbName: process.env.DB_NAME || "db.sqlite",

  jwt: {
    accessSecret,
    rereshSecret,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
};
