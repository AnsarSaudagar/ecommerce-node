import { Request, Response } from "express";
import { CartService } from "../services/CartService";

export class CartController {
  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }

  async getAllCarts(req: Request, res: Response) {
    try {
      const carts = await this.cartService.getAllCarts();
      res.json(carts);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async addProductToUserCart(req: Request, res: Response) {
    try {
      const new_cart = await this.cartService.addProductToUserCart(req.body);
      res.status(201).json({
        message: "Cart successfully added",
        cart: new_cart,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getUserCart(req: Request, res: Response) {
    try {
      const carts = await this.cartService.getUserCart(+req.params.user_id);
      res.json(carts);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getUserCartCategoryWise(req: Request, res: Response) {
    try {
      const carts = await this.cartService.getUserCartCategoryWise(
        +req.params.user_id,
        +req.params.category_id
      );
      res.json(carts);
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: error });
    }
  }

  async deleteSingleProductFromCart(req: Request, res: Response) {
    try {
      const deleted_cart = await this.cartService.deleteSingleProductFromCart(
        +req.params.cart_id
      );

      res.status(200).json({
        message: "Cart deleted successfully",
        deleted_cart: deleted_cart,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
}
