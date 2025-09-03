import { prop } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { v4 as uuidv4 } from "uuid";

@ObjectType()
export class Author {
  @Field(() => ID)
  @prop({ required: true, default: () => uuidv4() })
  public _id!: string;

  @Field(() => String)
  @prop({ required: true, minlength: 4, unique: true, type: String })
  public name!: string;

  @Field(() => Int, { nullable: true })
  @prop({ type: Number })
  public born?: number;
}
