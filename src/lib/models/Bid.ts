import { Schema, model, models, type InferSchemaType } from "mongoose";

const bidSchema = new Schema(
  {
    propFirm: { type: Schema.Types.ObjectId, ref: "PropFirm", required: true, index: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paying", "paid", "failed", "expired"],
      default: "pending",
      index: true,
    },
    trackId: { type: String, default: "", index: true },
    payCurrency: { type: String, default: "" },
    network: { type: String, default: "" },
    payAddress: { type: String, default: "" },
    payAmount: { type: Number, default: 0 },
    qrCode: { type: String, default: "" },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export type BidDoc = InferSchemaType<typeof bidSchema>;

export const Bid = models.Bid || model("Bid", bidSchema);
