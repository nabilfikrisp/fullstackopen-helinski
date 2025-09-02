import SchemaBuilder from "@pothos/core";
import { Author, AuthorModel } from "../entities/author/model";
import { BookModel } from "../entities/books/model";

export type ContextType = {
  db: {
    Author: typeof AuthorModel;
    Book: typeof BookModel;
  };
};

export type BuilderType = InstanceType<
  typeof SchemaBuilder<{
    Context: ContextType;
  }>
>;

export type AuthorRefType = PothosSchemaTypes.ImplementableObjectRef<
  PothosSchemaTypes.ExtendDefaultTypes<{
    Context: ContextType;
  }>,
  Author,
  Author
>;
