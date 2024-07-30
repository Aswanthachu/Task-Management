import express, { Application } from "express";
import { config } from "./src/helper/config/globalConfig";
import { logger, expressLogger } from "./src/helper/utils/logger";
import SwaggerDoc from "./src/helper/utils/swaggerSetup";
import { RegisterRoutes } from "./routes/routes";
import MongoDatabase from "./src/helper/db/mongodb";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setupLogger();
    this.plugins();
    this.mongoDbSync();
    this.routes();
  }

  protected plugins(): void {
    this.app.use((req, res, next) => {
      if (!req.path.startsWith("/api-docs")) {
        express.json()(req, res, next);
      } else {
        next();
      }
    });
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected mongoDbSync(): void {
    new MongoDatabase(config);
  }

  protected setupLogger(): void {
    this.app.use(expressLogger);
  }

  protected routes(): void {
    SwaggerDoc.init(this.app);
    // this.app.use(Auth.authenticate);
    RegisterRoutes(this.app);
  }
}

const app = new App().app;
const port: number | undefined = config.HOST_PORT;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
