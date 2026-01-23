import { Router } from "express";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller";
import authorize from "../middlewares/auth.middleware";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (_req, res) => res.send({ title: "GET all subscriptions" }));

subscriptionRouter.get("/:id", (_req, res) => res.send({ title: "GET subscription details" }));

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (_req, res) => res.send({ title: "UPDATE subscription" }));

subscriptionRouter.delete("/:id", (_req, res) => res.send({ title: "DELETE subscription" }));

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (_req, res) => res.send({ title: "CANCEL subscription" }));

subscriptionRouter.get("/upcoming-renewals", (_req, res) =>
  res.send({ title: "GET upcoming renewals" }),
);

export default subscriptionRouter;
