import "reflect-metadata";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { HelloArgs } from "./hello.args";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello(): string {
    return "Hello from TypeGraphQL + Apollo + TSX! asd";
  }

  @Query(() => String)
  async helloArg(@Arg("name", () => String) name: string) {
    return `Hello ${name}!`;
  }

  @Query(() => String)
  async helloArgs(@Args() { name, born }: HelloArgs) {
    return `Hello ${name}, you were born in ${born}!`;
  }

  @Mutation(() => String)
  goodbye(): string {
    return "Goodbye from TypeGraphQL + Apollo + TSX!";
  }
}
