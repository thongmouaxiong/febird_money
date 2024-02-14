import { Types } from "mongoose";
import { IBase } from "./base.interface";
import { ITag } from "./tag.interface";
import { IUser } from "./user.interface";

export interface IExpense extends IBase {
  user: string | Types.ObjectId | IUser,
  tag: string | Types.ObjectId | ITag,
  description: string,
  money: number
}