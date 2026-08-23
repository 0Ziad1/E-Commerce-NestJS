import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryFactoryService } from './factory';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategoryRepository, categorySchema } from '../../models';
import { UserMongoModule } from '../../shared/modules/user-mongo.module';
import { JwtService } from '@nestjs/jwt';
@Module({

  imports: [MongooseModule.forFeature([
    { name: Category.name, schema: categorySchema }
  ]), UserMongoModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryFactoryService, CategoryRepository,JwtService],
})
export class CategoryModule { }
