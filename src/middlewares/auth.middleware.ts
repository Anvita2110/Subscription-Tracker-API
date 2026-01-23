import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../models/user.models.js";

dotenv.config();

interface AuthJwtPayload extends JwtPayload {
  userId: string;
}

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthJwtPayload;

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Invalid token";

    return res.status(401).json({ message: "Unauthorized", error: message });
  }
};

export default authorize;
