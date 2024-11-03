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

  async login(email: string, password: string) {
    const user: User | null = await User.findOne({ where: { email: email } });

    if (!user) throw new Error("User not found");

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) throw new Error("Invalid Password");

    const token = this.generateToken(user.id);
    return { user, token };
  }

  generateToken(userId: number) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  }

  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (err) {
      throw new Error("Invalid token");
    }
  }
}
