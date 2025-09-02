import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Author {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => Int, { nullable: true })
  born?: number;
}
