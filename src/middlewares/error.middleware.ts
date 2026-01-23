import type { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { HttpError } from "../httpError";

type MongoServerError = {
  name: "MongoServerError";
  code?: number;
  message: string;
  keyValue?: Record<string, unknown>;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isMongoServerError(err: unknown): err is MongoServerError {
  if (!isObject(err)) return false;
  return err.name === "MongoServerError" && typeof err.message === "string";
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(404).json({
      success: false,
      error: "Resource not found",
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: messages.join(", "),
    });
  }

  if (isMongoServerError(err) && err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: "Duplicate field value entered",
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      success: false,
      error: err.message || "Server Error",
    });
  }

  return res.status(500).json({
    success: false,
    error: "Unknown error",
  });
};
