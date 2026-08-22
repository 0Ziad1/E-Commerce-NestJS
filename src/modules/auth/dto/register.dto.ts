import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"
import { } from "class-transformer"
export class RegisterDTO {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    userName!: string

    @IsEmail()
    @IsString()
    email!: string

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    password!: string


    otp!: string;
    otpExpiry!: Date;
    isVerified!: boolean;


    dob!: Date;


}
