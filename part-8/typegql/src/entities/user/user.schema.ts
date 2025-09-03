import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { v4 as uuidv4 } from "uuid";

@ObjectType()
export class User {
  @Field(() => ID)
  @prop({ required: true, default: () => uuidv4() })
  public _id!: string;

  @Field(() => String)
  @prop({ required: true, minlength: 3, maxlength: 100 })
  public username!: string;

  @Field(() => String)
  @prop({ required: true })
  public favoriteGenre!: string;
}
