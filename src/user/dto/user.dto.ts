import { IsString, IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    Matches()
    password: string

    @IsString()
    @IsOptional()
    firstName: string

    @IsString()
    @IsOptional()
    lastName: string
}

export class LoginDto {
    @IsString
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string;
}