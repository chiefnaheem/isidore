import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../database/schema/database.entity';

@ObjectType()
export class TokenEntity extends AbstractEntity {

  @Field()
  readonly access_token: string
}
