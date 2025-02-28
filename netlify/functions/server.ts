import express, { Router, Request, Response, NextFunction } from "express";
import serverless from "serverless-http";
import cookieParser from "cookie-parser";
import { createClient } from "redis";
import path from "path";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));
(async () => {
  await redisClient.connect();
})();

const EXPIRATION = 60 * 60 * 24; // 24 hours

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  const sessionID = cookies.session_id;
  if (!sessionID) {
    res.redirect(302, "/login");
    return;
  }

  const role = await redisClient.get(sessionID);
  if (!role) {
    res.redirect(302, "/login");
    return;
  }

  console.log("Role:", role);
  next();
};

const creds = {
  public: {
    password: "public",
  },
  admin: {
    password: "admin",
  },
};

const router = Router();

router.get("/", authMiddleware, (_, res) => {
  res.sendFile(path.resolve("netlify/functions/static", "index.html"));
});

router.post("/login", (req, res) => {
  const { password } = req.body;

  for (const [role, cred] of Object.entries(creds)) {
    if (cred.password === password) {
      const sessionID = generateSessionID();
      res.cookie("session_id", sessionID, {
        httpOnly: true,
        expires: new Date(Date.now() + EXPIRATION * 1000),
      });

      redisClient.set(sessionID, role, {
        EX: EXPIRATION,
      });

      res.redirect(302, "/");
      return;
    }
  }

  res.render("login", { errorMessage: "Invalid credentials" });
});

router.get("/login", (_, res) => {
  res.render("login");
});

function generateSessionID() {
  return Math.random().toString(36).substring(2, 15);
}

const api = express();
api.set("view engine", "ejs");
api.set("views", path.resolve("netlify/functions/views"));
api.use(cookieParser());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(router);
api.use("/static", express.static(path.resolve("netlify/functions/static")));

export const handler = serverless(api);

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing Redis client");
  await redisClient.disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing Redis client");
  await redisClient.disconnect();
  process.exit(0);
});
