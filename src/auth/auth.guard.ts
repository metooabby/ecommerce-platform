import type { AuthUser } from "./auth.types.js";
import {
  AuthenticationError,
  AuthorizationError,
} from "./auth.errors.js";

export function requireRole(
  user: AuthUser | null,
  allowedRoles: Array<AuthUser["role"]>
) {
  if (!user) {
    throw new AuthenticationError();
  }

  if (!allowedRoles.includes(user.role)) {
    throw new AuthorizationError(
      `Requires role: ${allowedRoles.join(" or ")}`
    );
  }
}
