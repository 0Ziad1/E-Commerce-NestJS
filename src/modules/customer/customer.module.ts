import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserMongoModule } from '../../shared/modules/user-mongo.module';

@Module({
  imports:[UserMongoModule],
  controllers: [CustomerController],
  providers: [CustomerService,JwtService,ConfigService],
})
export class CustomerModule {}
