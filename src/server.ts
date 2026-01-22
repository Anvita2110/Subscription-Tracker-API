import express from "express"
import {config} from "dotenv"
import authRouter from "./routes/auth.routes"
import userRouter from "./routes/user.routes"
import subscriptionRouter from "./routes/subscription.routes"
config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
    res.send("Hello World!")
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})