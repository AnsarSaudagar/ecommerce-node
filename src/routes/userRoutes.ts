import { Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
const userController = new UserController();

router.get("/", authenticateToken, (req: Request, res: Response) => {
  userController.getUser(req, res);
});

export default router;
