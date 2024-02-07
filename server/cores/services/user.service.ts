import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface";

export class UserService {
  private static secretKey: string;
  private static salt: number;
  private static instance: UserService;
  private static replaceKey: string;
  private constructor() {}
  // making singleton, define one time and access every where
  public static getInstance(
    secretKey: string,
    salt: number,
    replaceKey: string
  ): UserService {
    if (!this.instance) {
      this.secretKey = secretKey;
      this.salt = salt;
      this.replaceKey = replaceKey
      this.instance = new this();
    }
    return this.instance;
  }

  public static generatePassword(password: string): Promise<string> {
    return new Promise<string>(async (resolves, rejects) => {
      try {
        const pwd = this.secretKey + password;
        const salt = await bcrypt.genSalt(this.salt);
        const hash = await bcrypt.hash(pwd, salt);
        resolves(hash);
      } catch (err) {
        rejects(err);
      }
    });
  }

  public static comparePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return new Promise<boolean>(async (resolves, rejects) => {
      try {
        const pwd = this.secretKey + password;
        const isMatch = await bcrypt.compare(pwd, hashPassword);
        resolves(isMatch);
      } catch (err) {
        rejects(err);
      }
    });
  }

  public static generateToken(
    user: IUser,
    expiresIn: string | number = "1y"
  ): Promise<string> {
    return new Promise<string>(async (resolve, rejects) => {
      try {
        const payload = JSON.parse(JSON.stringify(user));
        let token = jwt.sign(payload, this.secretKey, {
          expiresIn,
        });
        console.log(this.replaceKey);
        
        token = token.replace(this.replaceKey, this.secretKey);
        resolve(token);
      } catch (error) {
        rejects(error);
      }
    });
  }

  public static verifyToken(token: string): Promise<IUser | null> {
    return new Promise<IUser>((resolves, resjects) => {
      try {
        token = token.replace(this.secretKey, this.replaceKey);
        jwt.verify(token, this.secretKey, (err, decode: IUser) => {
          if (err) return resolves(null);
          return resolves(decode);
        });
      } catch (err) {
        resjects(err);
      }
    });
  }
}
