import { Request, Response } from "express";
import { SendResponse } from "../services/sendResponse.service";
import { EErrorMessage } from "../enums/errorMessage.enum";
import { UserService } from "../services/user.service";

export class Middleware {
    async auth(req: Request, res: Response, next: any) {
     try {
       const token = req.headers["token"] as string;
       console.log("header token", token);
       if (!token)
         return SendResponse.error(res, EErrorMessage.TokenNotFound);
       const user = await UserService.verifyToken(token);
       if (!user)
         return SendResponse.error(res, EErrorMessage.InvalidToken);
       res.locals.user = user;
       next();
     } catch (err) {
       SendResponse.error(res, EErrorMessage.ServerError, err);
     }
   };
 }
 