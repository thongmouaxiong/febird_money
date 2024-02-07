import express, { Application, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { EApi } from "./cores/enums/api.enum";
import { Main } from "./main";

dotenv.config();

class Server {
  private app: Application = express();
  private router: Router = express.Router();
  private port = process.env.PORT || 3002;
  constructor() {
    this.config();
    this.run();
    new Main(this.router);
  }

  config() {
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: "500mb" }));
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: "500mb",
        parameterLimit: 500,
      })
    );
    this.app.use(EApi.version1, this.router);
  }

  run() {
    this.app.listen(this.port, () => {
      console.log("Server is runnig on port: ", this.port);
    });
  }
}

new Server();
