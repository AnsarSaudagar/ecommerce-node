import { Request, Router, Response } from "express";
import { CartController } from "../controllers/CartController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
const cartController = new CartController();

router.get("/all", (req: Request, res: Response) => {
  cartController.getAllCarts(req, res);
});

router.post("/", (req: Request, res: Response) => {
  cartController.addProductToUserCart(req, res);
});

router.get("/count/:user_id", (req: Request, res: Response) => {
  cartController.userCartCount(req, res);
});

router.get("/:user_id", (req: Request, res: Response) => {
  cartController.getUserCart(req, res);
});

router.get("/:user_id/:category_id", (req: Request, res: Response) => {
  cartController.getUserCartCategoryWise(req, res);
});


router.delete("/delete/:user_id", (req: Request, res: Response) => {
  cartController.deleteAllCartOfUser(req, res);
});

router.delete("/:user_id/:product_id", (req: Request, res: Response) => {
  cartController.deleteSingleProductFromCart(req, res);
});

router.patch("/:cart_id", (req: Request, res: Response) => {
  cartController.updatingCartCount(req, res);
});

router.post("/action/:product_id", authenticateToken, (req, res) => {
  cartController.createOrUpdateCart(req, res)
})

export default router;
