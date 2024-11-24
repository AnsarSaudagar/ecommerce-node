import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { Product } from "../models/Product";
import fs from "fs";
import AWS from "aws-sdk";
import { ProductImageService } from "../services/ProductImageService";

export class ProductController {
  private productService: ProductService;
  private productImageService: ProductImageService;

  constructor() {
    this.productService = new ProductService();
    this.productImageService = new ProductImageService();
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

  async updateProduct(req: any, res: Response) {
    try {
      const product_details: any = req.body;
      const imageFile = req.file;

      if (imageFile) {

        const product_image = await this.productImageService.addProductImage({
          product_id: product_details.id,
        });


        const fileName: string | undefined = product_image.image_name;
        this.uploadToS3(
          imageFile,
          `products/product_${product_details.id}/${fileName}`
        );
        
        product_details.image = fileName;
      }

      const updated_product = await this.productService.updateProduct(
        product_details
      );

      res.json(updated_product);
    } catch (error: any) {
      console.log(error);

      res.status(500).json({ error: error.message });
    }
  }

  async uploadToS3(file: any, filePath: string) {
    const s3 = new AWS.S3();

    // S3 upload parameters
    const params = {
      Bucket: "angularecommerce",
      Key: filePath,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // Upload to S3
    s3.upload(params, (err: any, data: any) => {
      if (err) {
        console.error("Error uploading to S3:", err);
      }
      console.log("File uploaded successfully:", data.Location);
    });
  }
}
