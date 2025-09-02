import { IsOptional, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAuthorInput {
  @Field({ nullable: false })
  @Length(3, 100, {
    message: "Name must be between 3 and 100 characters",
  })
  name!: string;

  @Field({ nullable: true })
  @IsOptional()
  born?: number;
}

@InputType()
export class EditAuthorInput {
  @Field({ nullable: false })
  id!: string;

  @Field({ nullable: true })
  @Length(3, 100, {
    message: "Name must be between 3 and 100 characters",
  })
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  born?: number;
}
