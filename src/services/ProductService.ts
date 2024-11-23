import { Product } from "../models/Product";

export class ProductService {
  /**
   * Retrieves all products from the database.
   * @returns {Promise<Product[]>}  A promise that resolves to an array of all products.
   * @throws {Error} - Throws an error if the retrieval fails.
   */
  async getAllProducts(): Promise<Product[]> {
    const products: Product[] = await Product.findAll();
    return products;
  }

  /**
   * Retrieves all products within a specific category.
   * @param {number} category_id - The ID of the category to filter products by.
   * @returns {Promise<Product[]>}  A promise that resolves to an array of products within the specified category.
   * @throws {Error} - Throws an error if the retrieval fails.
   */
  async getAllProductsCategoryWise(category_id: number): Promise<Product[]> {
    const products: Product[] = await Product.findAll({
      where: { category_id: category_id },
    });
    return products;
  }

  /**
   * Retrieves a single product based on its ID.
   * @param {number} product_id - The ID of the product to retrieve.
   * @returns {Promise<Product>}  A promise that resolves to the requested product.
   * @throws {Error} - Throws an error if no product is found for the given ID.
   */
  async getSingleProduct(product_id: number): Promise<Product> {
    const product: Product | null = await Product.findOne({
      where: { id: product_id },
    });

    if (!product) throw new Error("No Product for the given id");

    return product;
  }

  async updateProduct(product_details: Product) {
    const product = await Product.findOne({
      where: { id: product_details.id },
    });
    return await product?.update(product_details);
  }
}
