import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BusinessEntity } from 'src/business/schema/business.schema';
import { mongooseSchemaConfig } from 'src/utils/schema.config';
import { ObjectType, Field } from '@nestjs/graphql';
@Schema(mongooseSchemaConfig)
@ObjectType()
export class CustomerEntity {
  @Prop({ required: true })
  @Field(() => String)
  firstName: string;

  @Prop()
  @Field(() => String)
  lastName: string;

  @Prop()
  @Field(() => String)
  address: string;

  @Prop([{ type: Types.ObjectId, ref: BusinessEntity.name }])
  @Field(() => [Types.ObjectId])
  businesses: Types.ObjectId[];
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerEntity);
export type DepartmentDocument = CustomerEntity & Document;
