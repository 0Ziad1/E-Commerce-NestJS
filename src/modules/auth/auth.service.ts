import { ConflictException, Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../models/customer/customer.repository';
import { Customer } from './entities/auth.entity';
import { sendEmail } from '../../common/helpers/send-mail.helper';

@Injectable()
export class AuthService {
  constructor(private readonly customerRepository: CustomerRepository) { };
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
}
