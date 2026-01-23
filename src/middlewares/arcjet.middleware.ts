import type { NextFunction, Request, Response } from "express";
import aj from "../arcjet";

export const arcjetMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const webRequest = new Request(`${req.protocol}://${req.get("host")}${req.originalUrl}`, {
      method: req.method,
      headers: req.headers as Record<string, string>,
      body: req.body ? JSON.stringify(req.body) : undefined,
    });

    const decision = await aj.protect(webRequest, { requested: 1 });
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too many requests" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ error: "No bots allowed" });
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
    }

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
};

export default arcjetMiddleware;
