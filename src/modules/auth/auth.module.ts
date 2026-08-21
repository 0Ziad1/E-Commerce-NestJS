import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserMongoModule } from '../../shared/modules/user-mongo.module';

import { AuthFactoryService } from './factory';

@Module({
  imports: [UserMongoModule],
  controllers: [AuthController],
  providers: [AuthService,
    AuthFactoryService
  ],
})
export class AuthModule { }
