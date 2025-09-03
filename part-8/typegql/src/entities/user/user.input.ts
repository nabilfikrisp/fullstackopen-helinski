import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  @Length(3, 100, {
    message: "Username must be between 3 and 100 characters long",
  })
  username!: string;

  @Field(() => String, { nullable: false })
  @Length(8, 100, {
    message: "Password must be at least 8 characters long",
  })
  password!: string;

  @Field(() => String, { nullable: false })
  @Length(1, 50, {
    message: "Favorite genre must be between 1 and 50 characters",
  })
  favoriteGenre!: string;
}

@InputType()
export class LoginInput {
  @Field(() => String, { nullable: false })
  @Length(3, 100, {
    message: "Username must be between 3 and 100 characters long",
  })
  username!: string;

  @Field(() => String, { nullable: false })
  @Length(8, 100, {
    message: "Password must be at least 8 characters long",
  })
  password!: string;
}
