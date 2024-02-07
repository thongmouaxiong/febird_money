import { Router } from "express";
import { Cloudinary } from "./cores/configs/cloudinary";
import { ConnectDatabase } from "./cores/configs/database";
import { UserService } from "./cores/services/user.service";

export class Main {
  private databaseURL = process.env.DATABASE_URL;
  private cloudinaryName = process.env.CLOUDINARY_NAME;
  private cloudinaryKey = process.env.CLOUDINARY_API_KEY;
  private cloudinarySecret = process.env.CLOUDINARY_API_SECRET;
  private SECRET_KEY: string = process.env.SECRET_KEY;
  private SALT_I: number = parseInt(process.env.SALT);
  constructor(router: Router) {
    // config 
    new ConnectDatabase(this.databaseURL);
    new Cloudinary(
      this.cloudinaryName,
      this.cloudinaryKey,
      this.cloudinarySecret
    );

    // server services
    UserService.getInstance(this.SECRET_KEY, this.SALT_I);

    // server models

    // server routers
  }
}
