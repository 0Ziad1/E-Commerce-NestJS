import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandFactoryService } from './factory/brand.factory';
import { AuthGuard } from '../../common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Brand, BrandRepository, brandSchema } from '../../models';
import { UserMongoModule } from '../../shared/modules/user-mongo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }])
    , UserMongoModule
  ],
  controllers: [BrandController],
  providers: [BrandService, BrandFactoryService, BrandRepository],
  exports: [BrandService, BrandFactoryService, BrandRepository]
})
export class BrandModule { }