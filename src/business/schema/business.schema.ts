import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserEntity } from 'src/user/schema/user.entity';
import { mongooseSchemaConfig } from 'src/utils/schema.config';
import { ObjectType, Field } from '@nestjs/graphql';

@Schema(mongooseSchemaConfig)
@ObjectType()
export class BusinessEntity {
  @Prop({ required: true })
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => String)
  type: string;

  @Prop()
  @Field(() => String)
  address: string;

  @Prop({ type: Types.ObjectId, ref: UserEntity.name })
    @Field(() => Types.ObjectId)
  owner: Types.ObjectId;
}

export const BusinessSchema = SchemaFactory.createForClass(BusinessEntity);
export type BusinessDocument = BusinessEntity & Document;
