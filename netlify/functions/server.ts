import express, { Router, Request, Response, NextFunction } from "express";
import serverless from "serverless-http";
import cookieParser from "cookie-parser";
import { createClient } from "redis";
import path from "path";
import bcrypt from "bcrypt";

declare global {
  namespace Express {
    interface Request {
      role?: string;
    }
  }
}

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

  req.role = role;
  next();
};

const creds = {
  public: {
    password: "$2a$12$pl.gEd0tZshpeZtBQmanbu6ZmKS0HUg4/abeUzwBFExfWl.vYi4PO",
  },
  admin: {
    password: "$2a$12$EMMWfWD4vU7lzZprNNEwM.wOkgxJQunqb5rLGtE2tgcesOwSkReCi",
  },
};

const router = Router();

router.get("/", authMiddleware, (req, res) => {
  res.render("index", { role: req.role });
});

router.post("/login", async (req, res) => {
  const { password } = req.body;

  for (const [role, cred] of Object.entries(creds)) {
    const match = await bcrypt.compare(password, cred.password);
    if (match) {
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
