import { Request, Response } from "express";
import { User } from "../models/User";
import { AuthService } from "../services/AuthServices";
import { IGetUserAuthInfoRequest } from "../@types/express";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    try {
      const user: User = await this.authService.register(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { user, token } = await this.authService.login(email, password);

      res.json({ user, token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  async verifyToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Token not provided");

      const decoded = this.authService.verifyToken(token);
      res.json(decoded);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
  async getProfile(req: any, res: any) {
    try {
      const user = await User.findOne({ where: { id: req.userId } }); // Access userId from the token
      if (!user) return res.status(404).json({ message: "Please enter a valid email" });

      res.json({ user });
    } catch (err) {
      console.log(err);

      res.status(500).json({ message: "Server error" });
    }
  }
}
