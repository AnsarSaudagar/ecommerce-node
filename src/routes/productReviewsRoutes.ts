import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { ProductReviewsController } from "../controllers/ProductReviewsController";

const router = Router();
const productReviewsController = new ProductReviewsController();

router.post("/add", (req, res) => {
  productReviewsController.addNewProductReview(req, res);
});

export default router;
