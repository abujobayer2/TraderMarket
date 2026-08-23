import { Schema, model, models, type InferSchemaType } from "mongoose";

const propFirmSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, unique: true, index: true },
    websiteUrl: { type: String, required: true, trim: true, maxlength: 300 },
    logoUrl: { type: String, default: "" },
    description: { type: String, default: "", maxlength: 1000 },
    status: {
      type: String,
      enum: ["pending", "active", "removed"],
      default: "pending",
    },
    currentBidAmount: { type: Number, default: 0 },
    currentBidId: { type: Schema.Types.ObjectId, ref: "Bid", default: null },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Covers getActiveLeaderboard's exact access pattern (filter by status, sort
// by bid desc) so MongoDB can satisfy it from the index instead of an
// in-memory sort as the firm count grows. The status-only prefix of this
// index also serves the plain `{ status: "active" }` lookups used elsewhere
// (checkout, firm profile pages), so no separate single-field index is needed.
propFirmSchema.index({ status: 1, currentBidAmount: -1 });

export type PropFirmDoc = InferSchemaType<typeof propFirmSchema>;

export const PropFirm = models.PropFirm || model("PropFirm", propFirmSchema);
