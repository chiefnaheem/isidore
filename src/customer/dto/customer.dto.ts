import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsString()
  @IsOptional()
  @Field()
  lastName?: string;

  @IsString()
  @IsOptional()
  @Field()
  address?: string;

  @IsString()
  @IsOptional()
  @Field()
  businesses: string;
}


@InputType()
export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  @Field()
  firstName?: string;

  @IsString()
  @IsOptional()
  @Field()
  lastName?: string;

  @IsString()
  @IsOptional()
  @Field()
  address?: string;
}
