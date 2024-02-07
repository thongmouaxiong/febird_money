import { Router } from "express";
import { UserController } from "./user.controller";
import { EUserPath } from "../../cores/enums/userPath.enum";
import { Middleware } from "../../cores/middleware/middleware";

export class UserRoute {
  private middleware: Middleware = new Middleware()
  constructor(userController: UserController, router: Router) {
    try {
        router.post(EUserPath.register, userController.register.bind(userController))
        router.post(EUserPath.login, userController.login.bind(userController))
        router.get(EUserPath.getUserMany, userController.getUserMany.bind(userController))
        router.get(EUserPath.getUserOne, userController.getUserOne.bind(userController))
        router.get(EUserPath.getUserInfo, this.middleware.auth, userController.getUserInfo.bind(userController))
    } catch (error) {
      console.log("user route error => ", error);
    }
  }
}
