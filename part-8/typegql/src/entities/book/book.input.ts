import { ArrayNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateBookInput {
  @Field(() => String, { nullable: false })
  @Length(2, 100, {
    message: "Title must be between 2 and 100 characters long",
  })
  title!: string;

  @Field(() => String, { nullable: true })
  @Length(3, 100, {
    message: "Author name must be between 3 and 100 characters",
  })
  authorName!: string;

  @Field(() => Number, { nullable: false })
  published!: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @ArrayNotEmpty({ message: "Genres array cannot be empty" })
  @IsString({ each: true, message: "Each genre must be a string" })
  @Length(3, 20, { each: true, message: "Each genre must be 3-20 characters" })
  genres?: string[];
}
