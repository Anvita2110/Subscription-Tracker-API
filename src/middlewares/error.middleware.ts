import type { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

type ErrorWithStatus = Error & { statusCode?: number };

const errorMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  try {

    const error: ErrorWithStatus =
      err instanceof Error ? (err as ErrorWithStatus) : (new Error(String(err)) as ErrorWithStatus);

    if (!error.statusCode) error.statusCode = 500;

    console.error(err);

    if (err instanceof mongoose.Error.CastError || (err as any)?.name === "CastError") {
      const e = new Error("Resource not found") as ErrorWithStatus;
      e.statusCode = 404;
      return res.status(e.statusCode).json({ success: false, error: e.message });
    }

    if (typeof (err as any)?.code === "number" && (err as any).code === 11000) {
      const e = new Error("Duplicate field value entered") as ErrorWithStatus;
      e.statusCode = 400;
      return res.status(e.statusCode).json({ success: false, error: e.message });
    }

    if (err instanceof mongoose.Error.ValidationError || (err as any)?.name === "ValidationError") {
      const validationErr = err as mongoose.Error.ValidationError;
      const messages = Object.values(validationErr.errors).map((val) => val.message);

      const e = new Error(messages.join(", ")) as ErrorWithStatus;
      e.statusCode = 400;
      return res.status(e.statusCode).json({ success: false, error: e.message });
    }

    return res
      .status(error.statusCode)
      .json({ success: false, error: error.message || "Server Error" });
  } catch (caught) {
    next(caught);
  }
};

export default errorMiddleware;
