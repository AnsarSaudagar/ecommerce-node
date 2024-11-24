import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export class AuthService {  
  /**
   * Registers a new user with the provided details, including hashing the password before saving to the database.
   *
   * @async
   * @param {User} userDetails - An object containing the user's registration details.
   * Must include a `password` field, which will be hashed before saving.
   * @returns {Promise<User>} A promise that resolves to the newly created user object.
   *
   * @description
   * This asynchronous function takes user details as input, hashes the password using bcrypt for security,
   * and then saves the user to the database. The function ensures that sensitive password information is
   * not stored in plain text. Upon successful registration, it returns the created user object.
   *
   * @throws {Error} If there’s an issue with saving the user to the database or hashing the password
   */
  async register(userDetails: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    userDetails.password = hashedPassword;

    const user = await User.create(userDetails);

    return user;
  }

  /**
   * Authenticates the user with the provided email and password, returning a token and user data if successful.
   *
   * @param {string} email - The user's email address. Must be a valid, registered email.
   * @param {string} password - The user's password. Should match the password stored for the provided email.
   * @returns {{ token: string, use: User }} An object containing a JWT token and the authenticated user's data.
   *
   * @description
   * This function verifies the user's email and password. If the email is registered and the password matches, it
   * generates a JSON Web Token (JWT) for authentication and returns the token along with the user's data. The token
   * can be used for accessing protected routes and expires after a set period.
   *
   * @throws {Error} If authentication fails due to an incorrect email or password, or if there’s a server error.
   *
   */
  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: User | null, expiresIn: number }> {
    const user: User | null = await User.findOne({ where: { email: email } });

    if (!user) throw new Error("Please enter a valid email");

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) throw new Error("Invalid Password");

    const expiresIn = 60 * 60;

    const token = this.generateToken(user.id);
    return { user, token , expiresIn};
  }

  /**
   * Generates an authentication token based on the provided user ID.
   *
   * @param {string} userId - The unique identifier for the user. This ID is used to generate the token.
   * @returns {string} A JWT (JSON Web Token) that expires in 1 hour.
   *
   * @description
   * This function generates a JSON Web Token (JWT) using the provided user ID.
   *
   * @throws {Error} If the token generation fails.
   *
   * @example
   * // Example usage:
   * const token = generateToken("user123");
   * console.log(token); // Prints the generated token
   */
  generateToken(userId: number): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  }

  /**
   * Verifies a JSON Web Token (JWT) and returns the decoded payload if valid.
   *
   * @param {string} token - The JWT string to be verified.
   * @returns {string| JwtPayload} The decoded token payload, which typically contains user information.
   *
   * @throws {Error} Throws an error if the token is invalid or cannot be verified.
   *
   * @description
   * This function verifies the provided JWT against a secret key (`JWT_SECRET`). If the token is valid,
   * it returns the decoded payload containing user data or claims embedded within the token. If the token
   * is invalid, expired, or tampered with, it throws an error indicating that the token is invalid.
   *
   * @example
   * // Example usage:
   * try {
   *   const decodedData = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");
   *   console.log(decodedData); // Outputs the decoded token payload
   * } catch (error) {
   *   console.error("Token verification failed:", error.message);
   * }
   */
  verifyToken(token: string): string | JwtPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (err) {
      throw new Error("Invalid token");
    }
  }
}
