import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { BusinessEntity } from 'src/business/schema/business.schema';
import { mongooseSchemaConfig } from 'src/utils/schema.config';

@Schema(mongooseSchemaConfig)
export class CustomerEntity {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  address: string;

  @Prop([{ type: Types.ObjectId, ref: BusinessEntity.name }])
  businesses: Types.ObjectId[];
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerEntity);
export type DepartmentDocument = CustomerEntity & Document;
