import { Model } from "mongoose";
import { IUser } from "../../cores/interfaces/user.interface";
import { Request, Response } from "express";
import { SendResponse } from "../../cores/services/sendResponse.service";
import { EErrorMessage } from "../../cores/enums/errorMessage.enum";
import { ESSO } from "../../cores/enums/sso.enum";
import { UserService } from "../../cores/services/user.service";
import { EMessage } from "../../cores/enums/message.enum";

export class UserController {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async register(req: Request, res: Response) {
    try {
      let userBody = req.body as IUser;

      if (!userBody.sso || userBody.sso == ESSO.none) {
        //   generate hash password
        if (!userBody.password) {
          return SendResponse.error(res, EErrorMessage.RequiredPassword);
        }
        const hashPassword = await UserService.generatePassword(
          userBody.password
        );
        userBody.password = hashPassword;
      }
      const user: IUser = await this.userModel.create(userBody);
      const token = await UserService.generateToken(user);
      SendResponse.create(res, EMessage.RegisterSuccess, { user, token });
    } catch (err) {
      console.log("register error => ", err);
      SendResponse.error(res, EErrorMessage.ServerError, err);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const userBody = req.body as IUser;
      // check user is exist (login by username or email)
      const findUser: IUser = await this.userModel.findOne({
        $or: [{ username: userBody.username }, { email: userBody.email }],
      });

      if (!findUser) {
        return SendResponse.error(res, EErrorMessage.InvalidUsernameOrPassword);
      }

      //   compare password
      const isMatch = await UserService.comparePassword(
        userBody.password,
        findUser.password
      );

      if (!isMatch) {
        return SendResponse.error(res, EErrorMessage.InvalidUsernameOrPassword);
      }

      const token = await UserService.generateToken(findUser);

      SendResponse.success(res, EMessage.LoginSuccess, {
        user: findUser,
        token,
      });
    } catch (err) {
      console.log("logIn error => ", err);
      SendResponse.error(res, EErrorMessage.ServerError, err);
    }
  }

  async getUserOne(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const user = await this.userModel.findOne({
        _id: userId,
        isActive: true,
      });
      SendResponse.success(res, EMessage.GetUserOneSuccess, user);
    } catch (err) {
      console.log("getUserOne error => ", err);
      SendResponse.error(res, EErrorMessage.ServerError, err);
    }
  }

  async getUserInfo(req: Request, res: Response) {
    try {
      const user = res.locals.user as IUser
      SendResponse.success(res, EMessage.GetUserInfoSuccess, user);
    } catch (err) {
      console.log("getUserInfo error => ", err);
      SendResponse.error(res, EErrorMessage.ServerError, err);
    }
  }

  async getUserMany(req: Request, res: Response) {
    try {
      const users = await this.userModel.find({
        isActive: true,
      });
      SendResponse.success(res, EMessage.GetUserManySuccess, users);
    } catch (err) {
      console.log("getUserMany error => ", err);
      SendResponse.error(res, EErrorMessage.ServerError, err);
    }
  }
}
