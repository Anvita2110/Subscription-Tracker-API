import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ title: "Get All Users" });
});

userRouter.post("/", (req, res) => {
  res.send({ title: "Create User" });
});

userRouter.get("/:id", (req, res) => {
  res.send({ title: "Get a Particular User" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ title: "Update a Particular User" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete a Particular User" });
});

export default userRouter;
