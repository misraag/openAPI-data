import mongoose from "mongoose";

const aiSummarySchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  summary: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("AISummary", aiSummarySchema);
