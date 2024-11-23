import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { Product } from "../models/Product";

export class ProductController {
  private productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }

  async getAllProducts(req: Request, res: Response) {
    try {
      const products: Product[] = await this.productService.getAllProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllProductsCategoryWise(req: Request, res: Response) {
    try {
      const category_id: number = +req.params.category_id;
      const products: Product[] =
        await this.productService.getAllProductsCategoryWise(category_id);
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSingleProduct(req: Request, res: Response) {
    try {
      const product_id: number = +req.params.product_id;
      const product: Product = await this.productService.getSingleProduct(
        product_id
      );
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProduct(req: any, res: Response){
    try {
       
      const product_details: any = req.body;
      const imageFile = req.file


      const updated_product = await this.productService.updateProduct(product_details);
      
      res.json(updated_product);
    } catch (error: any) {
      console.log(error);
      
      res.status(500).json({ error: error.message });
    }
  }
}
