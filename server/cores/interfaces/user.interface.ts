import { IBase } from "./base.interface";

export interface IUser extends IBase {
  firstname: string;
  lastname: string;
  username: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  // sso = single sign on (login by social media accout: google, facebook, ...)
  sso?: string;
}
