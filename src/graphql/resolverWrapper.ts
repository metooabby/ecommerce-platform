import { mapToGraphQLError } from "./errors.js";

/**
 * Wraps a resolver to ensure all errors
 * are converted into GraphQL-safe errors
 */
export function withErrorHandling<
  TParent,
  TArgs,
  TContext,
  TResult
>(
  resolver: (
    parent: TParent,
    args: TArgs,
    context: TContext
  ) => Promise<TResult> | TResult
) {
  return async (
    parent: TParent,
    args: TArgs,
    context: TContext
  ): Promise<TResult> => {
    try {
      return await resolver(parent, args, context);
    } catch (error) {
      throw mapToGraphQLError(error);
    }
  };
}
