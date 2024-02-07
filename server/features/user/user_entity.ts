import mongoose, { Model, Schema } from "mongoose";
import { v4 as uuidV4 } from "uuid";
import { IUser } from "./user_interface";
import { UserService } from "../../../cores/services/user_service";

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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this;
  if (user.isModified("password")) {
    try {
      const hashPassword = await UserService.generatePassword(user.password);
      console.log("password hash", hashPassword);
      if (hashPassword) {
        user.password = hashPassword;
      }
      next();
    } catch (err) {
      console.log("error generate password: ", err);
      next();
    }
  } else {
    next();
  }
});

export class UserEntity {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public model(): Model<IUser> {
    return mongoose.model(this.tableName, userSchema);
  }
}
