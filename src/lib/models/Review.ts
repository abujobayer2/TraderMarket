import { Schema, model, models, type InferSchemaType } from "mongoose";
import { TRADER_TYPES } from "@/lib/reviewTypes";

export { TRADER_TYPES } from "@/lib/reviewTypes";

const reviewSchema = new Schema(
  {
    propFirm: { type: Schema.Types.ObjectId, ref: "PropFirm", required: true, index: true },
    // Denormalised so the review page and revalidation can key off the slug
    // without a second lookup against PropFirm on every read. Not indexed on
    // its own — every query that filters by firmSlug also filters by status,
    // and the compound indexes below have firmSlug as their leading field.
    firmSlug: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, default: "", trim: true, maxlength: 120 },
    body: { type: String, required: true, trim: true, maxlength: 2000 },
    authorName: { type: String, required: true, trim: true, maxlength: 80 },
    traderType: { type: String, enum: TRADER_TYPES, default: "Other" },
    status: {
      type: String,
      enum: ["published", "pending", "hidden"],
      default: "published",
    },
    // Provenance of the review. Every review is a genuine, first-hand
    // visitor submission — always "user". Not indexed: a single-value field.
    source: {
      type: String,
      enum: ["user"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Review list for one firm, newest first (getFirmReviews). Its { firmSlug,
// status } prefix also satisfies the dedupe check in the POST handler.
reviewSchema.index({ firmSlug: 1, status: 1, createdAt: -1 });

// Rating breakdown for one firm (getReviewSummary). `rating` in the key makes
// the count/avg/distribution aggregation a covered query — no document fetch,
// even for a firm with tens of thousands of reviews.
reviewSchema.index({ firmSlug: 1, status: 1, rating: 1 });

// Every firm's count + average in one pass (getReviewSummaries, used on the
// homepage and rankings pages). Covered: match on status, group by firmSlug,
// average the rating, all from the index.
reviewSchema.index({ status: 1, firmSlug: 1, rating: 1 });

export type ReviewDoc = InferSchemaType<typeof reviewSchema>;

export const Review = models.Review || model("Review", reviewSchema);
