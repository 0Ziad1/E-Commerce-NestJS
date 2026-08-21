import { generateOtp } from "../../../common";
import { RegisterDto } from "../dto";
import { Customer } from "../entities/auth.entity";
import bcrypt from "bcrypt"

export class AuthFactoryService {
    async createCustomer(registerDto: RegisterDto) {
        const customer = new Customer();
        customer.userName = registerDto.userName;
        customer.email = registerDto.email;
        customer.isVerified = false;
        customer.password = await bcrypt.hash(registerDto.password, 10);
        customer.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        customer.otp = generateOtp();
        customer.dob = registerDto.dob;
        return customer;
    }
}