import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsAlpha,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterDto {
  @Field()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @Field()
  password: string;

  @IsString()
  @Field()
  @IsOptional()
  @IsAlpha()
  firstName?: string;

  @IsString()
  @Field()
  @IsOptional()
  @IsAlpha()
  lastName?: string;
}

@InputType()
export class LoginDto {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  @IsNotEmpty()
  password: string;
}
