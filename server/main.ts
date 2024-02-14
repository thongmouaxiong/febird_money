import { Request, Response, Router } from "express";
import { Cloudinary } from "./cores/configs/cloudinary";
import { ConnectDatabase } from "./cores/configs/database";
import { UserService } from "./cores/services/user.service";
import { UserFeature } from "./features/user";
import { TagFeuture } from "./features/tag";

export class Main {
  private databaseURL = process.env.DATABASE_URL;
  private cloudinaryName = process.env.CLOUDINARY_NAME;
  private cloudinaryKey = process.env.CLOUDINARY_API_KEY;
  private cloudinarySecret = process.env.CLOUDINARY_API_SECRET;
  private SECRET_KEY: string = process.env.SECRET_KEY;
  private REPLACE_KEY: string = process.env.REPLACE_KEY;
  private SALT_I: number = parseInt(process.env.SALT);
  constructor(router: Router) {
    // config
    new ConnectDatabase(this.databaseURL);
    new Cloudinary(
      this.cloudinaryName,
      this.cloudinaryKey,
      this.cloudinarySecret
    );

    // server's services
    UserService.getInstance(this.SECRET_KEY, this.SALT_I, this.REPLACE_KEY);

    // test api
    router.use("/test", (req: Request, res: Response) => {
      res.status(200).send("Server api is working.");
    });
    
    // server's features
    new UserFeature(router);
    new TagFeuture(router);
  }
}
