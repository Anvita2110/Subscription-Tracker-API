import express, { urlencoded } from "express"
import {config} from "dotenv"
import authRouter from "./routes/auth.routes"
import userRouter from "./routes/user.routes"
import subscriptionRouter from "./routes/subscription.routes"
import connectDatabase from "./database/mongodb"
import cookieParser from "cookie-parser"
import errorMiddleware from "./middlewares/error.middleware"

config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(PORT, async() => {
    console.log(`Server running on port ${PORT}`)
    await connectDatabase();
})