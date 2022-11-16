import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserEntity } from 'src/user/schema/user.entity';
import { mongooseSchemaConfig } from 'src/utils/schema.config';

@Schema(mongooseSchemaConfig)
export class BusinessEntity {
  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop()
  address: string;

  @Prop({ type: Types.ObjectId, ref: UserEntity.name })
  owner: Types.ObjectId;
}

export const BusinessSchema = SchemaFactory.createForClass(BusinessEntity);
export type BusinessDocument = BusinessEntity & Document;
