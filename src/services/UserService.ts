import { User } from "../models/User";

export class UserService {
  async getUser(user_id: number): Promise<User | null> {
    const user: User | null = await User.findOne({
      where: {
        id: user_id,
      },
    });
    return user;
  }
}
