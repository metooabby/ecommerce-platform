import type { AuthUser } from "./auth.types.js";

/**
 * Temporary auth decoder.
 * Later this will verify JWT / OAuth.
 */
export function decodeAuthToken(
  token?: string
): AuthUser | null {
  if (!token) return null;

  // 🔒 MOCKED USER — safe for now
  if (token === "dev-user") {
    return {
      id: "user-123",
      email: "dev@user.com",
      role: "USER",
    };
  }

  if (token === "dev-admin") {
    return {
      id: "admin-123",
      email: "admin@shop.com",
      role: "ADMIN",
    };
  }

  return null;
}
