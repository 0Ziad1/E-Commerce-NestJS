import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { AuthFactoryService } from './factory';
import { LoginDTO } from './dto/login.dto';


@Controller('auth')

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactortService: AuthFactoryService
  ) { }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const customer = await this.authFactortService.createCustomer(registerDTO);
    const createdCustomer = await this.authService.register(customer)
    return {
      message: "User created successfully",
      success: true,
      data: createdCustomer,
    }
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const accessToken = await this.authService.login(loginDTO);
    return {
      message: "User logged successfully",
      success: true,
      data: {
        token: accessToken,
      }
    }
  }
}
