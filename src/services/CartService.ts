import { Cart } from "../models/Cart";
import { Product } from "../models/Product";

export class CartService {
  async getAllCarts(): Promise<Cart[]> {
    const carts: Cart[] = await Cart.findAll();

    return carts;
  }

  async addProductToUserCart(cart_details: Cart): Promise<Cart> {
    const new_cart: Cart = await Cart.create(cart_details);
    return new_cart;
  }

  async getUserCart(user_id: number): Promise<Cart[]> {
    const carts = await Cart.findAll({
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "description", "price"],
        },
      ],
      where: {
        user_id: user_id,
        status: Cart.STATUS_ACTIVE,
      },
    });

    return carts;
  }

  async getUserCartCategoryWise(
    user_id: number,
    category_id: number
  ): Promise<Cart[]> {
    const carts = await Cart.findAll({
      where: {
        user_id: user_id,
        status: Cart.STATUS_ACTIVE,
      },
      include: [
        {
          model: Product,
          where: {
            category_id: category_id,
          },
          as: "product",
          attributes: ["id", "name", "description", "price"],
        },
      ],
    });
    return carts;
  }
}
