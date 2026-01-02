import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    category: String,
    articles: Array,
    fetchedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("NewsCache", newsSchema);
