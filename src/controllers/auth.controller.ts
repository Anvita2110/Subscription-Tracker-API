import bcrypt from "bcryptjs";
import { config } from "dotenv";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

config();

import User from "../models/user.models";

type ErrorWithStatus = Error & { statusCode?: number };

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

function assertEnv(value: string | undefined, name: string): asserts value is string {
  if (!value) throw new Error(`${name} is not set`);
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    assertEnv(JWT_SECRET, "JWT_SECRET");

    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      const error: ErrorWithStatus = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({ name, email, password: hashedPassword }).save({ session });

    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(error);
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    assertEnv(JWT_SECRET, "JWT_SECRET");

    const { email, password } = req.body as { email: string; password: string };

    const user = await User.findOne({ email });

    if (!user) {
      const error: ErrorWithStatus = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password as string);

    if (!isPasswordValid) {
      const error: ErrorWithStatus = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const safeUser = user.toObject();
    delete (safeUser as any).password;

    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user: safeUser,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const signOut = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ success: true, message: "Signed out" });
  } catch (error) {
    return next(error);
  }
};
