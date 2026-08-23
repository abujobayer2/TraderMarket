// One-off seed script: populates the leaderboard with well-known prop firms
// so the board isn't empty on launch. Safe to re-run — skips firms whose
// slug already exists. Run with: npm run seed
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2];
    }
  }
}

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// Ranked by review count where available (a real signal in the source data);
// firms without review data keep the source order beneath them. Bids step
// down in reasonable $50 increments, all comfortably above the $10 minimum.
const FIRMS = [
  {
    name: "FundedNext",
    description:
      "FundedNext is a global proprietary trading firm offering funded trading programs, evaluation challenges, and multiple account options for traders.",
    logoUrl: "https://www.google.com/s2/favicons?domain=fundednext.com&sz=128",
    websiteUrl: "https://fundednext.com",
    bidAmount: 500,
  },
  {
    name: "FTMO",
    description:
      "FTMO is a well-established proprietary trading firm offering a structured evaluation process with trading challenges, verification, and funded trading opportunities.",
    logoUrl: "https://www.google.com/s2/favicons?domain=ftmo.com&sz=128",
    websiteUrl: "https://ftmo.com",
    bidAmount: 450,
  },
  {
    name: "The5ers",
    description:
      "The5ers is a proprietary trading firm offering funded trading programs, instant funding options, trader education, and scaling opportunities.",
    logoUrl: "https://www.google.com/s2/favicons?domain=the5ers.com&sz=128",
    websiteUrl: "https://the5ers.com",
    bidAmount: 400,
  },
  {
    name: "FundingPips",
    description:
      "FundingPips is a proprietary trading firm offering funded trading programs and evaluation-based opportunities for traders.",
    logoUrl: "https://www.google.com/s2/favicons?domain=fundingpips.com&sz=128",
    websiteUrl: "https://fundingpips.com",
    bidAmount: 350,
  },
  {
    name: "Alpha Capital Group",
    description:
      "Alpha Capital Group is a proprietary trading firm focused on providing traders with evaluation programs and access to funded trading opportunities.",
    logoUrl: "https://www.google.com/s2/favicons?domain=alphacapitalgroup.uk&sz=128",
    websiteUrl: "https://alphacapitalgroup.uk",
    bidAmount: 300,
  },
  {
    name: "E8 Markets",
    description:
      "E8 Markets is a proprietary trading firm offering trading evaluations and funded account programs for traders.",
    logoUrl: "https://www.google.com/s2/favicons?domain=e8markets.com&sz=128",
    websiteUrl: "https://e8markets.com",
    bidAmount: 250,
  },
  {
    name: "Tradeify",
    description:
      "Tradeify is a proprietary trading firm focused on funded trading programs and opportunities for traders, including futures trading.",
    logoUrl: "https://www.google.com/s2/favicons?domain=tradeify.co&sz=128",
    websiteUrl: "https://tradeify.co",
    bidAmount: 200,
  },
  {
    name: "Topstep",
    description:
      "Topstep is a proprietary trading firm focused on futures traders, offering trading evaluations and funded trading opportunities.",
    logoUrl: "https://www.google.com/s2/favicons?domain=topstep.com&sz=128",
    websiteUrl: "https://www.topstep.com",
    bidAmount: 150,
  },
  {
    name: "Maven Trading",
    description:
      "Maven Trading is a proprietary trading firm offering funded trading programs and evaluation opportunities for traders.",
    logoUrl: "https://www.google.com/s2/favicons?domain=maventrading.com&sz=128",
    websiteUrl: "https://maventrading.com",
    bidAmount: 100,
  },
  {
    name: "BrightFunded",
    description:
      "BrightFunded is a proprietary trading firm offering funded account programs and evaluation opportunities for traders.",
    logoUrl: "https://www.google.com/s2/favicons?domain=brightfunded.com&sz=128",
    websiteUrl: "https://brightfunded.com",
    bidAmount: 50,
  },
];

const propFirmSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    websiteUrl: String,
    logoUrl: String,
    description: String,
    status: { type: String, default: "pending" },
    currentBidAmount: { type: Number, default: 0 },
    currentBidId: { type: mongoose.Schema.Types.ObjectId, ref: "Bid", default: null },
  },
  { timestamps: true }
);

const bidSchema = new mongoose.Schema(
  {
    propFirm: { type: mongoose.Schema.Types.ObjectId, ref: "PropFirm" },
    amount: Number,
    status: { type: String, default: "pending" },
    trackId: { type: String, default: "" },
    payCurrency: { type: String, default: "" },
    network: { type: String, default: "" },
    payAddress: { type: String, default: "" },
    payAmount: { type: Number, default: 0 },
    qrCode: { type: String, default: "" },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const paymentSchema = new mongoose.Schema(
  {
    propFirm: { type: mongoose.Schema.Types.ObjectId, ref: "PropFirm" },
    bid: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" },
    amount: Number,
    provider: { type: String, default: "oxapay" },
    trackId: { type: String, default: "" },
    status: { type: String, default: "pending" },
    rawCallback: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

async function main() {
  loadEnvLocal();
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not found in .env.local");

  await mongoose.connect(uri);
  const PropFirm = mongoose.model("PropFirm", propFirmSchema);
  const Bid = mongoose.model("Bid", bidSchema);
  const Payment = mongoose.model("Payment", paymentSchema);

  let created = 0;
  let skipped = 0;

  for (const firm of FIRMS) {
    const slug = slugify(firm.name);
    const exists = await PropFirm.findOne({ slug });
    if (exists) {
      skipped += 1;
      console.log(`skip (exists): ${firm.name}`);
      continue;
    }

    const doc = await PropFirm.create({
      name: firm.name,
      slug,
      websiteUrl: firm.websiteUrl,
      logoUrl: firm.logoUrl,
      description: firm.description,
      status: "active",
      currentBidAmount: firm.bidAmount,
    });

    const bid = await Bid.create({
      propFirm: doc._id,
      amount: firm.bidAmount,
      status: "paid",
      trackId: `seed-${slug}`,
    });

    await Payment.create({
      propFirm: doc._id,
      bid: bid._id,
      amount: firm.bidAmount,
      provider: "seed",
      trackId: `seed-${slug}`,
      status: "paid",
    });

    doc.currentBidId = bid._id;
    await doc.save();

    created += 1;
    console.log(`created: ${firm.name} — $${firm.bidAmount}`);
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped} (already existed).`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
