import config from "config";
import express from "express";
import { Routes } from "./interfaces/routes.interface";
import { logger, stream } from "./utils/logger";
import morgan from "morgan";
class App {
  public app: express.Application;
  public env: string;
  public port: number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = process.env.NODE_ENV || "development";
    this.port = config.get<number>("PORT");

    this.initializeRoutes(routes);
    this.initializeMiddlewares();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`==============================`);
      logger.info(`========ENV:${this.env}=======`);
      logger.info(`App is listening on the port ${this.port}`);
      logger.info(`================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }
  private initializeMiddlewares() {
    this.app.use(morgan("tiny"));
  }
}

export default App;
