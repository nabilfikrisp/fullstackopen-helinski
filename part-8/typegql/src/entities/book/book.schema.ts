import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Book {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => Number)
  published!: number;

  @Field(() => String)
  authorId!: string;

  @Field(() => [String])
  genres!: string[];
}
