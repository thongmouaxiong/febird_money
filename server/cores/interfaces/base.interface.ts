import { ObjectId } from "mongoose";

export interface IBase {
  _id?: ObjectId;
  uuid?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
