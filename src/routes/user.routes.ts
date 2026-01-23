import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller";
import authorize from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/", authorize, getAllUsers);

userRouter.post("/", (_req, res) => {
  res.send({ title: "Create User" });
});

userRouter.get("/:id", getUserById);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
