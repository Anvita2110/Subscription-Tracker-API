import type { NextFunction, Request, Response } from "express";
import User from "../models/user.models";

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json({ success: true, data: allUsers });
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userByID = await User.findById(req.params.id);
    return res.status(200).json({ success: true, data: userByID });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name: name });
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return next(error);
  }
};
