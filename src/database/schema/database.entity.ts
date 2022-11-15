import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AbstractEntity {
  @Field()
  readonly _id: string;
}
