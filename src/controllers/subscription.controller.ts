import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../httpError";
import Subscription from "../models/subscription.models";

export const createSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new HttpError("Unauthorized: User not found", 401));
    }

    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    return res.status(201).json({ success: true, data: subscription });
  } catch (error: unknown) {
    return next(error);
  }
};

export const getUserSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new HttpError("Unauthorized: User not found", 401));
    }

    if (req.user._id.toString() !== req.params.id) {
      return next(new HttpError("Unauthorized", 401));
    }

    const subscriptions = await Subscription.find({ user: req.user._id });
    return res.status(200).json({ success: true, data: subscriptions });
  } catch (error: unknown) {
    return next(error);
  }
};
