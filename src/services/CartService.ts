import { Cart } from "../models/Cart";

export class CartService{
    async getAllCarts(){
        const carts = await Cart.findAll();

        return carts;
    }
}