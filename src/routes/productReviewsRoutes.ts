import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { ProductReviewsController } from "../controllers/ProductReviewsController";

const router = Router();
const productReviewsController = new ProductReviewsController();

router.post("/add", (req, res) => {
  productReviewsController.addNewProductReview(req, res);
});
router.get("/:product_id", (req, res) => {
  productReviewsController.getProductReview(req, res);
});

router.get("/count-avg/:product_id", (req, res) => {
  productReviewsController.getProductReviewCountAndAvg(req, res);
});

export default router;
