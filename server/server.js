import dotenv from "dotenv";
import NewsCache from "./models/NewsCache.js";
dotenv.config({ path: "./.env" });

console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);


import express from 'express';
import cors from 'cors';
import axios from "axios";
import mongoose from 'mongoose';
import aiRoutes from "./routes/ai.js";

const uri = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/ai", aiRoutes);


app.get('/', (req, res) => {
  res.send({
    message: "You are now connected to backend..."
  });
});


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

  try{
    const cached = await NewsCache.findOne({ category });

    if(cached){
      const age = now - new Date(cached.fetchedAt).getTime();

      if(age<CACHE_DURATION){
        console.log(`Returning Mongo cached news for ${category}`);
        return res.json({ articles: cached.articles, cached: true})
      }
    }
    console.log(`Fetching fresh news for ${category}`);

    const response = await axios.get(url + categoryURL);
    const articles = response.data.articles;

    await NewsCache.findOneAndUpdate(
      { category },
      {
        category,
        articles,
        fetchedAt: new Date(),
      },
      { upsert: true }
    );

    res.json({articles, cached:false});
  } catch(error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({error: "Failed to fetch news"});
  }
});

const startServer = async () => {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected");

    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();

// app.listen(5000, () => console.log("Server is listening on port no. 5000...."));
