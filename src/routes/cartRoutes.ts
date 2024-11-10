import { Router } from "express";
import { CartController } from "../controllers/CartController";

const router = Router();
const cartController = new CartController();


export default router;