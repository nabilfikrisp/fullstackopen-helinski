import { GraphQLError } from "graphql";
import { ArgumentValidationError, MiddlewareFn } from "type-graphql";
import { Error as MongooseError } from "mongoose";

export const ErrorHandlerMiddleware: MiddlewareFn = async ({}, next) => {
  try {
    return await next();
  } catch (err) {
    if (err instanceof ArgumentValidationError) {
      return formatValidationError(err);
    }
    if (err instanceof MongooseError) {
      return formatMongooseError(err);
    }
    if (err instanceof Error && err.message.includes("E11000")) {
      return formatDuplicateKeyError(err);
    }
    if (
      err instanceof GraphQLError &&
      err.extensions?.code === "BAD_USER_INPUT"
    ) {
      return formatGraphQLError(err);
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

/** Format Mongoose errors */
function formatMongooseError(err: MongooseError) {
  console.error(err, "MONGOOSE");
  let message = "Database error";
  let code = "DATABASE_ERROR";
  if (err.name === "ValidationError") {
    message = "Validation failed";
    code = "BAD_USER_INPUT";
  } else if (err.name === "CastError") {
    message = "Invalid data format";
    code = "BAD_USER_INPUT";
  }
  return new GraphQLError(message, {
    extensions: {
      code,
      originalError: err.message,
    },
  });
}

/** Format duplicate key errors (code 11000) */
function formatDuplicateKeyError(err: Error) {
  console.error(err, "DUPLICATE_KEY");
  return new GraphQLError("Duplicate key error", {
    extensions: {
      code: "BAD_USER_INPUT",
      originalError: err.message,
    },
  });
}

/** Format GraphQL BAD_USER_INPUT errors */
function formatGraphQLError(err: GraphQLError) {
  return new GraphQLError(err.message, {
    extensions: {
      code: "BAD_USER_INPUT",
      originalError: err.message,
    },
  });
}

/** Format internal server errors */
function formatInternalError(err: unknown) {
  console.error(err, "INTERNAL");
  return new GraphQLError("Internal server error", {
    extensions: {
      code: "INTERNAL_SERVER_ERROR",
      originalError: err instanceof Error ? err.message : String(err),
    },
  });
}
