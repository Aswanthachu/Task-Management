import * as dotenv from "dotenv";
dotenv.config();

interface GlobalConfig {
  HOST_PORT: number | undefined;
  MONGODB_URI: string;
}

const config: GlobalConfig = {
  HOST_PORT: (process.env.HOST_PORT as unknown as number) || 3000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/Branch",
};

export { config, GlobalConfig };
