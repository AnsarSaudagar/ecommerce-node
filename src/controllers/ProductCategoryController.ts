import { Request, Response } from "express";
import { ProductCategory } from "../models/ProductCategory";
import { ProductCategoryService } from "../services/ProductCategoryService";

export class ProductCategoryController {
  private productCategoryService: ProductCategoryService;

  constructor() {
    this.productCategoryService = new ProductCategoryService();
  }

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await this.productCategoryService.getAllCategories();
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
