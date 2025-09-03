import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../entities/user/user.schema";
import { Book } from "../entities/book/book.schema";
import { Author } from "../entities/author/author.schema";

export const UserModel = getModelForClass(User);
export const BookModel = getModelForClass(Book);
export const AuthorModel = getModelForClass(Author);
