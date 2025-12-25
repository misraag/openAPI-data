import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);


import express from 'express';
import cors from 'cors';
import axios from "axios";
import mongoose from 'mongoose';
import aiRoutes from "./routes/ai.js";




const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/ai", aiRoutes);


app.get('/', (req, res) => {
  res.send({
    message: "You are now connected to backend..."
  });
});

let cachedNews = {};
let lastFetchTime = {};
const CACHE_DURATION = 1000 * 60 * 60;


const url =
    "https://newsapi.org/v2/everything?"  +
    "sortBy=popularity&" +
    "apiKey=411f72e6d5734fc79b19ee2d1f243158&";

app.get("/news/:category", async (req, res) => {
  let now = Date.now();
  let category = req.params.category
  let categoryURL = `q=${req.params.category}`

  console.log("Entered news api for category:... ", category)
 

  if (cachedNews[category] && (now - lastFetchTime[category] < CACHE_DURATION)) {
    console.log(`Returning cached news for category ${category}`);
    return res.json(cachedNews[category]);
  }
  

  try {
    const response = await axios.get(url+categoryURL);
    cachedNews[category] = response.data;
    lastFetchTime[category] = now;
    console.log(`Fetched fresh news for category ${category}`)
    res.json(cachedNews[category]);
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(5000, () => console.log("Server is listening on port no. 5000...."));
