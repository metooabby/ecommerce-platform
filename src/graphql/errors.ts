import { GraphQLError } from "graphql";
import {
  AuthenticationError,
  AuthorizationError,
} from "../auth/auth.errors.js";

export function mapToGraphQLError(error: unknown): GraphQLError {
  if (error instanceof AuthenticationError) {
    return new GraphQLError(error.message, {
      extensions: { code: error.code },
    });
  }

  if (error instanceof AuthorizationError) {
    return new GraphQLError(error.message, {
      extensions: { code: error.code },
    });
  }

  // existing mappings below 👇
  // ProductError, OrderError, etc.

  return new GraphQLError("Internal server error", {
    extensions: { code: "INTERNAL_SERVER_ERROR" },
  });
}
