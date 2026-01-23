import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/bun";
import dotenv from "dotenv";

dotenv.config();
const ARCJET_KEY = process.env.ARCJET_KEY;

if (!ARCJET_KEY) {
  throw new Error("ARCJET_KEY is not defined");
}

const aj = arcjet({
  key: ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;
