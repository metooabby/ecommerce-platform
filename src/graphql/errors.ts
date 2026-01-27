import { GraphQLError } from "graphql";
import { DomainError } from "../domain/errors/DomainError.js";

/**
 * Maps domain and unknown errors to GraphQL errors
 */
export function mapToGraphQLError(error: unknown): GraphQLError {
  // Domain (business) errors → client-safe GraphQL errors
  if (error instanceof DomainError) {
    return new GraphQLError(error.message, {
      extensions: {
        code: error.code,
      },
    });
  }

  // Unknown / system errors → generic internal error
  return new GraphQLError("Internal server error", {
    extensions: {
      code: "INTERNAL_SERVER_ERROR",
    },
  });
}
