import { Router } from "express";
import { ProductCategoryController } from "../controllers/ProductCategoryController";

const router = Router();
const productCategoryController = new ProductCategoryController();

router.get("/", (req, res) =>
  productCategoryController.getAllCategories(req, res)
);

export default router;
