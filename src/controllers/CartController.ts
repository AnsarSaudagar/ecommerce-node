import { Request, Response } from "express";
import { CartService } from "../services/CartService";

export class CartController{
    private cartService: CartService;

    constructor(){
        this.cartService = new CartService();
    }

    async getAllCarts(req: Request, res: Response ){
        try {
            const carts = await this.cartService.getAllCarts();
            res.json(carts);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}