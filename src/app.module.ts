import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import devConfig from './config/env/dev.config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './modules/customer/customer.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { CommanModule } from './shared/modules/common.module';
import { ProductModule } from './modules/product/product.module';


@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [devConfig]
  }),
    // MongooseModule.forRoot(devConfig().DB_URL.url as string,{}),//another way to connect to the database
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("DB_URL.url") as string,
      })
    }),
    CustomerModule,
    CategoryModule,
    BrandModule,
    CommanModule,
    ProductModule
    // MongooseModule.forFeature([
    //   {
    //     name: User.name, schema: userSchema, discriminators:
    //       [
    //         { name: Seller.name, schema: sellerSchema },
    //       ]
    //   }
    // ]),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
