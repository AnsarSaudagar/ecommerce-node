import { Request, Router, Response } from "express";
import { CartController } from "../controllers/CartController";

const router = Router();
const cartController = new CartController();

router.get("/all", (req: Request, res: Response) => {
  cartController.getAllCarts(req, res);
});

export default router;
