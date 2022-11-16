import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { mongooseSchemaConfig } from 'src/utils/schema.config';
import { AbstractDocument } from '../../database/schema/database.schema';

@Schema(mongooseSchemaConfig)
export class UserDocument {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
