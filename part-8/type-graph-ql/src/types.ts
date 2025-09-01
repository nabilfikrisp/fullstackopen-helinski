import SchemaBuilder from "@pothos/core";
import { Author } from "./entities/author/types";

export type ContextType = {};

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
