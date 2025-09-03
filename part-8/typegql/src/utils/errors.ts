import { GraphQLError } from "graphql";

export function throwUnauthorizedError(): never {
  throw new GraphQLError("Unauthorized", {
    extensions: { code: "UNAUTHENTICATED" },
  });
}
