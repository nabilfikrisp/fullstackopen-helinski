import { GraphQLError } from "graphql";
import { ArgumentValidationError, MiddlewareFn } from "type-graphql";

export const ErrorHandlerMiddleware: MiddlewareFn = async ({}, next) => {
  try {
    return await next();
  } catch (err) {
    if (err instanceof ArgumentValidationError) {
      return formatValidationError(err);
    }
    return formatInternalError(err);
  }
};

/** Format validation errors from class-validator */
function formatValidationError(err: ArgumentValidationError) {
  const messages = err.extensions.validationErrors
    .map((e) => Object.values(e.constraints || {}))
    .flat();

  return new GraphQLError("Validation failed", {
    extensions: {
      code: "BAD_USER_INPUT",
      errors: messages,
    },
  });
}

/** Format internal server errors */
function formatInternalError(err: unknown) {
  console.error(err);
  return new GraphQLError("Internal server error", {
    extensions: {
      code: "INTERNAL_SERVER_ERROR",
    },
  });
}
