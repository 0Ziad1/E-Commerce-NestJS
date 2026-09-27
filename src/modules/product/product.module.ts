import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserMongoModule } from '../../shared/modules/user-mongo.module';
import { ProductFactoryService } from './factory/product.factory';
import { Product, ProductRepository, productSchema } from '../../models';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '../category/category.module';
import { BrandModule } from '../brand/brand.module';

@Module({
  imports: [UserMongoModule
    , MongooseModule.forFeature([{ name: Product.name, schema: productSchema }])
    , CategoryModule
    , BrandModule
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductFactoryService, ProductRepository],
})
export class ProductModule { }
