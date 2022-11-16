import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/schema/database.entity';

@ObjectType()
export class UserEntity extends AbstractEntity {
  @Field()
  readonly email: string;

  @Field()
  readonly access_token?: string
}
