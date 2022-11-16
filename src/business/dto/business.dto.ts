import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBusinessDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsOptional()
  @Field()
  type?: string;

  @IsString()
  @IsOptional()
  @Field()
  address?: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  owner: string;
}

@InputType()
export class UpdateBusinessDto {
  @IsString()
  @IsOptional()
  @Field()
  name?: string;

  @IsString()
  @IsOptional()
  @Field()
  type?: string;

  @IsString()
  @IsOptional()
  @Field()
  address?: string;
}
