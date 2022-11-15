import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
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
  firstName: string;

  @IsString()
  @Field()
  @IsOptional()
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
