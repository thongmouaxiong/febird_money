import mongoose, { Model, Schema } from "mongoose";
import { v4 as uuidV4 } from "uuid";
import { IUser } from "../../cores/interfaces/user.interface";
import { ESSO } from "../../cores/enums/sso.enum";

const userSchema = new Schema<IUser, Model<IUser>>(
  {
    uuid: {
      type: String,
      unique: true,
      default: uuidV4(),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
    },
    sso: {
      type: String,
      enum: ESSO,
      default: ESSO.none,
    },
  },
  {
    timestamps: true,
  }
);

export class UserModel {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public model(): Model<IUser> {
    return mongoose.model(this.tableName, userSchema);
  }
}
