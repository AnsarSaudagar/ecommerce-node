import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { IGetUserAuthInfoRequest } from "../@types/express";

export class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUser(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      if (!req.userId) {
        throw new Error("User not authenticated");
      }
      const user = await this.userService.getUser(+req.userId);
      res.json(user)
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
}
