import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthFactoryService } from './factory';


@Controller('auth')

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactortService: AuthFactoryService
  ) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const customer = await this.authFactortService.createCustomer(registerDto);
    const createdCustomer = await this.authService.register(customer)
    return {
      message: "User created successfully",
      success: true,
      data: createdCustomer,
    }
  }
}
