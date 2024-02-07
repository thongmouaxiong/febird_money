import mongoose, { ConnectOptions } from "mongoose";

export class ConnectDatabase {
  constructor(url: string, options?: ConnectOptions) {
    try {
      mongoose.connect(url, options);
      console.log("connected database");
    } catch (err) {
      console.log("connect database error: ", err);
    }
  }
}
