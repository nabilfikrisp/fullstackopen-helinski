import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { Author } from "../author/author.schema";

@ObjectType()
export class Book {
  @Field(() => ID)
  @prop({ required: true, default: () => uuidv4() })
  public _id!: string;

  @Field(() => String)
  @prop({ required: true, unique: true, minlength: 5, type: String })
  public title!: string;

  @Field(() => Number)
  @prop({ type: Number })
  public published!: number;

  @Field(() => Author)
  @prop({ ref: () => Author, type: String, required: true })
  public author!: Ref<Author>;

  @Field(() => [String])
  @prop({ type: [String] })
  public genres!: string[];
}

export const BookModel = getModelForClass(Book);
