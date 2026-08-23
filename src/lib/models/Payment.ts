import { Schema, model, models, type InferSchemaType } from "mongoose";

const paymentSchema = new Schema(
  {
    propFirm: { type: Schema.Types.ObjectId, ref: "PropFirm", required: true, index: true },
    bid: { type: Schema.Types.ObjectId, ref: "Bid", required: true, index: true },
    amount: { type: Number, required: true },
    provider: { type: String, default: "oxapay" },
    trackId: { type: String, default: "", index: true },
    status: {
      type: String,
      enum: ["pending", "paying", "paid", "failed", "expired"],
      default: "pending",
      index: true,
    },
    rawCallback: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

export type PaymentDoc = InferSchemaType<typeof paymentSchema>;

export const Payment = models.Payment || model("Payment", paymentSchema);
