import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../database/database.schema';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop({required: true, unique: true})
  email: string;

  @Prop()
  password: string;

    @Prop()
  firstName: string

    @Prop()
    lastName: string
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);