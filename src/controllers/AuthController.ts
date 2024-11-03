import { Request, Response } from "express";
import { AuthService } from "../services/authServices";
import { User } from "../models/User";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response){
    try {
        const user : User = await this.authService.register(req.body);
        res.status(201).json(user);
        
    } catch (error : any) {
        res.status(400).json({message : error.message})
    }
  }
}
