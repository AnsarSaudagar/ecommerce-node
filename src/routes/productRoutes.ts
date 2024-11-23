import { Request, Response, Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();
const productController = new ProductController();

router.get("/", (req: Request, res: Response) =>
  productController.getAllProducts(req, res)
);
router.get("/:category_id", (req: Request, res: Response) => {
  productController.getAllProductsCategoryWise(req, res);
});
router.get("/get-product/:product_id", (req: Request, res: Response) => {
    productController.getSingleProduct(req, res);
})

router.patch("/update", (req: Request, res: Response)=>{
  productController.updateProduct(req, res);
});


export default router;
