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

  @Prop([{ type: String, ref: BusinessEntity.name }])
  @Field(() => [String])
  businesses: string[];
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerEntity);
export type CustomerDocument = CustomerEntity & Document;
