import { generateOtp } from "../../../common";
import { RegisterDTO } from "../dto";
import { Customer } from "../entities/auth.entity";
import bcrypt from "bcrypt"

export class AuthFactoryService {
    async createCustomer(registerDTO: RegisterDTO) {
        const customer = new Customer();
        customer.userName = registerDTO.userName;
        customer.email = registerDTO.email;
        customer.isVerified = false;
        customer.password = await bcrypt.hash(registerDTO.password, 10);
        customer.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        customer.otp = generateOtp();
        customer.dob = registerDTO.dob;
        return customer;
    }
}