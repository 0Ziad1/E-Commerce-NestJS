import { } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"
export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}