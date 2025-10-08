import express from 'express';
import cors from 'cors';
import axios from "axios";
import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({
    message: "You are now connected to backend..."
  });
});

let cachedNews = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 60;

app.get("/news", async (req, res) => {
  const now = Date.now();

  console.log("Entered news api...")

  if (cachedNews && (now - lastFetchTime < CACHE_DURATION)) {
    console.log("Returning cached news 🗞️");
    return res.json(cachedNews);
  }

  console.log("Fetching new news....")
  const url =
    "https://newsapi.org/v2/everything?" +
    "q=News&" +
    "sortBy=popularity&" +
    "apiKey=411f72e6d5734fc79b19ee2d1f243158";

  try {
    const response = await axios.get(url);
    cachedNews = response.data;
    lastFetchTime = now;
    console.log("Fetched fresh news 🔄");
    res.json(cachedNews);
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(5000, () => console.log("Server is listening on port no. 5000...."));
