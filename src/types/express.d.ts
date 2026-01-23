import type { Document } from "mongoose";
import type User from "../models/user.models";

declare global {
  namespace Express {
    interface Request {
      user?: Document & typeof User;
    }
  }
}
