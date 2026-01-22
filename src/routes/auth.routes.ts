import {Router} from "express";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
    res.send({title: "Login"})
})

authRouter.post("/register", (req, res) => {
    res.send({title: "Register"})
})

authRouter.post("/logout", (req, res) => {
    res.send({title: "Logout"})
})

export default authRouter