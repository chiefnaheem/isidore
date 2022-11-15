import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../database/schema/database.schema';

@Schema({ versionKey: false, timestamps: true, autoIndex: true })
export class UserDocument extends AbstractDocument {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
