import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entities/product.entity";
import slugify from "slugify"
export class ProductFactoryService {
    createProduct(createProductDto: CreateProductDto, user: any) {
        const product = new Product();
        product.brandId = createProductDto.brandId;
        product.categoryId = createProductDto.categoryId;
        product.colors = createProductDto.colors;
        product.createdBy = user._id;
        product.updatedBy = user._id;
        product.description = createProductDto.description;
        product.discountAmount = createProductDto.discountAmount;
        product.discountType = createProductDto.discountType;
        product.name = createProductDto.name;
        product.price = createProductDto.price;
        product.sizes = createProductDto.sizes;
        product.sold = 0;
        product.slug = slugify(createProductDto.name);
        return product;
    }
}