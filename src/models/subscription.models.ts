import mongoose, { type HydratedDocument, type Model, type Schema, type Types } from "mongoose";

export interface ISubscription {
  name: string;
  price: number;
  currency: "USD" | "EUR" | "GBP" | "INR";
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  category:
    | "sports"
    | "news"
    | "entertainment"
    | "lifestyle"
    | "technology"
    | "finance"
    | "politics"
    | "other";
  paymentMethod: string;
  status: "active" | "cancelled" | "expired";
  startDate: Date;
  renewalDate?: Date;
  user: Types.ObjectId;
}

// Hydrated document type
export type SubscriptionDocument = HydratedDocument<ISubscription>;

// Schema
const subscriptionSchema = new mongoose.Schema<ISubscription>(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      // message says > 0 but min allows 0 — pick one.
      // If you truly want > 0, use min: [0.01, ...] or custom validator.
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "INR"],
      default: "INR",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator(value: Date) {
          return value <= new Date();
        },
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator(this: SubscriptionDocument, value: Date) {
          if (!value) return true;
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

subscriptionSchema.pre("save", async function (this: SubscriptionDocument) {
  const doc = this as SubscriptionDocument;

  const renewalPeriods: Record<ISubscription["frequency"], number> = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365,
  };

  if (!doc.renewalDate) {
    doc.renewalDate = new Date(doc.startDate);
    doc.renewalDate.setDate(doc.renewalDate.getDate() + renewalPeriods[doc.frequency]);
  }

  if (doc.renewalDate && doc.renewalDate < new Date()) {
    doc.status = "expired";
  }
});

const Subscription: Model<ISubscription> =
  mongoose.models.Subscription || mongoose.model<ISubscription>("Subscription", subscriptionSchema);

export default Subscription;
