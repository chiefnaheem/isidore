import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '../../common/abstract.model';

@ObjectType()
export class User extends AbstractEntity {
  @Field()
  readonly email: string;
}