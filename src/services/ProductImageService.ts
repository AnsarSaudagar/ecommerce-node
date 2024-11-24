import { ProductImage } from "../models/ProductImage";

export class ProductImageService{
    async addProductImage(image_detail: any){
        const product_image = await ProductImage.create(image_detail);

        return product_image;
    }
}