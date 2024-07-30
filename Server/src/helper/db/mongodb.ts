import mongoose from "mongoose";
import { logger } from "../../helper/utils/logger";
import { GlobalConfig } from "../config/globalConfig";
import { BranchModel } from "../../../src/model/branch";
class MongoDatabase {
  private readonly maxRetryAttempts: number = 20;
  private readonly retryInterval: number = 3000; //3 seconds
  private retryCount: number = 0;

  constructor(private config: GlobalConfig) {
    this.connectToMongoDb();
  }

  private async connectToMongoDb() {
    try {
      await mongoose.connect(this.config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any);
      mongoose.connection.once("open", async () => {
        await BranchModel.createIndexes();
      });
      logger.info("MongoDb Connected.");
    } catch (err) {
      logger.error("Unable to connect Mongodb:", err);

      if (this.retryCount < this.maxRetryAttempts) {
        this.retryConnection();
      } else {
        this.handleMaxRetries();
      }
    }
  }

  private retryConnection() {
    logger.info(
      `Retrying connection... Attempt ${this.retryCount + 1}/${
        this.maxRetryAttempts
      }`
    );
    setTimeout(() => {
      this.retryCount++;
      this.connectToMongoDb();
    }, this.retryInterval);
  }

  private handleMaxRetries() {
    logger.error(
      `Unable to connect after ${this.maxRetryAttempts} attempts. Stopping the application.`
    );
    process.exit(1);
  }
}

export default MongoDatabase;
