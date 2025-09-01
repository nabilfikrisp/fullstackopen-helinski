export type BuilderType = PothosSchemaTypes.SchemaBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<{}>
>;

export type TQueryType = PothosSchemaTypes.QueryFieldBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<{}>,
  {}
>;

export type TMutationType = PothosSchemaTypes.MutationFieldBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<{}>,
  {}
>;
