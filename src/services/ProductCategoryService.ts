import { ProductCategory } from "../models/ProductCategory";

export class ProductCategoryService {
  /**
   * Retrieves all product categories from the database.
   *
   * @async
   * @returns {Promise<ProductCategory[]>} A promise that resolves to an array of product categories.
   *
   * @description
   * This asynchronous function queries the database for all entries in the `ProductCategory` table.
   * It returns a list of categories, each represented as a `ProductCategory` object.
   * If no categories exist, an empty array is returned.
   *
   */
  async getAllCategories(): Promise<ProductCategory[]> {
    const categories: ProductCategory[] = await ProductCategory.findAll();
    return categories;
  }
}
