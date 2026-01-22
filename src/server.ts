import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express, { urlencoded } from "express";
import connectDatabase from "./database/mongodb";
import errorMiddleware from "./middlewares/error.middleware";
import authRouter from "./routes/auth.routes";
import subscriptionRouter from "./routes/subscription.routes";
import userRouter from "./routes/user.routes";

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
  res.send("Hello World!");
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDatabase();
});
