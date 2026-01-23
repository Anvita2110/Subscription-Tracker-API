import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.post("/", (_req, res) => {
  res.send({ title: "Create User" });
});

userRouter.get("/:id", getUserById);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
