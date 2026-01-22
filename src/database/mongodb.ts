import { config } from "dotenv";
import mongoose from "mongoose";

config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI || "");
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDatabase;
