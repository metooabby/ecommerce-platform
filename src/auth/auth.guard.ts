import type { AuthUser } from "./auth.types.js";
import { AuthorizationError } from "./auth.errors.js";

export function requireRole(
  user: AuthUser | null,
  allowedRoles: Array<AuthUser["role"]>
) {
  if (!user) {
    throw new AuthorizationError("Authentication required");
  }

  if (!allowedRoles.includes(user.role)) {
    throw new AuthorizationError(
      `Requires role: ${allowedRoles.join(" or ")}`
    );
  }
}
