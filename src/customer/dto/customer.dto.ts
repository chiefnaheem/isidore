import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    businesses?: Types.ObjectId[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}