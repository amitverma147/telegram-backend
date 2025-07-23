import type { Context, Next } from "hono";
import { ValidationError } from "./error.middleware.js";

export const sessionValidator = async (c: Context, n: Next) => {
  const user = c.get("user");
  const path = c.req.path;
  if (path.startsWith("/api/v1/dashboard") && !user) {
    throw new ValidationError(
      "Unauthorized access attempt detected.",
      {
        action: "access_protected_resources",
        requirePermission: "user",
        receivedPermission: "unauthorized",
      },
      401
    );
  }

  return await n();
};
