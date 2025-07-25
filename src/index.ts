import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { PORT } from "./lib/env.js";
import { auth } from "./lib/better-auth/auth.js";
import { addSession } from "./middleware/session.middleware.js";
import { configCors } from "./middleware/cors.middleware.js";
import { sessionValidator } from "./middleware/unauthorized-acess.middleware.js";
import errorHandler from "./middleware/error.middleware.js";
import { initBot } from "./bot/index.js";

const app = new Hono();
const port = Number(PORT) || 8080;

app.use(configCors);

app.use(addSession);
app.use(sessionValidator);

app.onError(errorHandler);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/", (c) => c.text("Welcome to the TELEGRAM BOT.", 200));

//BOT
initBot();

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
