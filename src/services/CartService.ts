import { Cart } from "../models/Cart";

export class CartService {
  async getAllCarts(): Promise<Cart[]> {
    const carts: Cart[] = await Cart.findAll();

    return carts;
  }

  async addProductToUserCart(cart_details: Cart): Promise<Cart> {
    const new_cart: Cart = await Cart.create(cart_details);
    return new_cart;
  }
}
