export const sessionValidator = async (c, n) => {
    const user = c.get("user");
    const path = c.req.path;
    if (path.startsWith("/api/v1/dashboard") && !user) {
        return c.json({ error: "Unauthorized access" }, 401);
    }
    return await n();
};
