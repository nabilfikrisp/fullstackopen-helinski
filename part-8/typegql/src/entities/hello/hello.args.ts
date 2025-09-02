import "reflect-metadata";
import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class HelloArgs {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => Int, { nullable: false })
  born!: number;
}
