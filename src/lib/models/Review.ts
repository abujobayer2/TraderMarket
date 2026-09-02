import { Schema, model, models, type InferSchemaType } from "mongoose";
import { TRADER_TYPES } from "@/lib/reviewTypes";

export { TRADER_TYPES } from "@/lib/reviewTypes";

const reviewSchema = new Schema(
  {
    propFirm: { type: Schema.Types.ObjectId, ref: "PropFirm", required: true, index: true },
    // Denormalised so the review page and revalidation can key off the slug
    // without a second lookup against PropFirm on every read.
    firmSlug: { type: String, required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, default: "", trim: true, maxlength: 120 },
    body: { type: String, required: true, trim: true, maxlength: 2000 },
    authorName: { type: String, required: true, trim: true, maxlength: 80 },
    traderType: { type: String, enum: TRADER_TYPES, default: "Other" },
    status: {
      type: String,
      enum: ["published", "pending", "hidden"],
      default: "published",
      index: true,
    },
    // Provenance of the review. Every review is a genuine, first-hand
    // visitor submission — always "user".
    source: {
      type: String,
      enum: ["user"],
      default: "user",
      index: true,
    },
  },
  { timestamps: true }
);

// Covers the review page's access pattern: all published reviews for one firm,
// newest first. The firmSlug-only prefix also serves the aggregate count/avg
// queries used on the firm profile page.
reviewSchema.index({ firmSlug: 1, status: 1, createdAt: -1 });

export type ReviewDoc = InferSchemaType<typeof reviewSchema>;

export const Review = models.Review || model("Review", reviewSchema);
