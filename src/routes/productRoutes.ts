import { Request, Response, Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();
const productController = new ProductController();
const multer = require('multer');

// Configure Multer to handle file uploads
    // const upload = multer({ dest: 'uploads' });
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", (req: Request, res: Response) =>
  productController.getAllProducts(req, res)
);
router.get("/:category_id", (req: Request, res: Response) => {
  productController.getAllProductsCategoryWise(req, res);
});
router.get("/get-product/:product_id", (req: Request, res: Response) => {
    productController.getSingleProduct(req, res);
})

router.patch("/update", upload.single('image'), (req: Request, res: Response)=>{
  productController.updateProduct(req, res);
});


export default router;
