import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerRepository } from '../../models/customer/customer.repository';
import { Customer } from './entities/auth.entity';
import { sendEmail } from '../../common/helpers/send-mail.helper';
import { LoginDTO } from './dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { };
  async register(customer: Customer) {
    const customerExistance = await this.customerRepository.exist(
      { email: customer.email });
    if (customerExistance) throw new ConflictException("Customer already exist");
    const createdCustomer = await this.customerRepository.create(customer);
    const { password, otp, otpExpiry, ...customerData } = JSON.parse(JSON.stringify(createdCustomer));
    await sendEmail({
      subject: "Confirmation mail",
      to: customer.email,
      html: `<h1>Your Opp is </h1>
            <h2>${customer.otp}</h2>
      `
    })
    return customerData;
  }
  async login(loginDTO: LoginDTO) {
    const customerExistance = await this.customerRepository.getOne(
      { email: loginDTO.email }
    );
    const match = await bcrypt.compare(loginDTO?.password, customerExistance?.password as string || "")

    if (!customerExistance || !match) throw new UnauthorizedException('invalid credintials');
    const token = this.jwtService.sign(
      { id: customerExistance.id, email: customerExistance.email}
      , { secret: this.configService.get('access').secure },
    )
    return token

  }
}
