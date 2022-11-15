import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  IsAlpha
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterDto {
  @Field()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message: 'Password too weak',
  })
  @Field()
  password: string;

  @IsString()
  @Field()
  @IsOptional()
  @IsAlpha()
  firstName: string;

  @IsString()
  @Field()
  @IsOptional()
  @IsAlpha()
  lastName: string;
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
