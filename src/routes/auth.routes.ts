import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/login", signIn);

authRouter.post("/register", signUp);

authRouter.post("/logout", signOut);

export default authRouter;
