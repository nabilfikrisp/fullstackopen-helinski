import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class BookArgs {
  @Field({ nullable: true })
  authorId?: string;

  @Field({ nullable: true })
  genre?: string;
}
