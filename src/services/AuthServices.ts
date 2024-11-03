import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
// import { UserCreationAttributes } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export class AuthService {
  async register(userDetails: User) {
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    userDetails.password = hashedPassword;

    const user = await User.create(userDetails);

    return user;
  }
}
