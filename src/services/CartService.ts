import sequelize from "sequelize";
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
          attributes: ["id", "name", "description", "price", "image"],
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
          attributes: ["id", "name", "description", "price", "image"],
        },
      ],
    });
    return carts;
  }

  async deleteSingleProductFromCart(
    user_id: number,
    product_id: number
  ): Promise<Cart | null> {
    const deleted_cart: Cart | null = await Cart.findOne({
      where: {
        user_id: user_id,
        product_id: product_id,
      },
    });
    if (deleted_cart?.destroy()) {
      return deleted_cart;
    }

    throw new Error("Cart was not able to be deleted due to some error");
  }

  async updatingCartCount(
    cart_id: number,
    count: number,
    update_type: number
  ): Promise<Cart> {
    const cart: Cart | null = await Cart.findOne({
      where: {
        id: cart_id,
      },
    });
    if (!cart) {
      throw new Error("Cart not available");
    }
    if (update_type === Cart.UPDATE_TYPE_CALC) {
      cart.count += count;
    } else {
      cart.count = count;
    }
    cart.save();
    return cart;
  }

  async userCartCount(user_id: number): Promise<Cart[]> {
    const carts: Cart[] = await Cart.findAll({
      where: {
        user_id: user_id,
        status: Cart.STATUS_ACTIVE,
      },
    });
    return carts;
  }

  async deleteAllCartOfUser(user_id: number): Promise<boolean | Error> {
    const carts_deleted = await Cart.destroy({
      where: {
        user_id: user_id,
        status: Cart.STATUS_ACTIVE,
      },
    });
    if (carts_deleted) {
      return true;
    }

    throw new Error("Carts was not deleteds");
  }

  async createOrUpdateCart(
    product_id: number,
    user_id: number,
    count: number
  ): Promise<Cart> {
    const product_cart: Cart | null = await Cart.findOne({
      where: {
        user_id: user_id,
        product_id: product_id,
      },
    });

    if (product_cart) {
      product_cart.count = count;
      product_cart.save();
      return product_cart;
    }

    const new_cart: Cart = await Cart.create({
      count: count,
      user_id: user_id,
      product_id: product_id,
      status: Cart.STATUS_ACTIVE,
    });

    return new_cart;
  }
}
