import express from "express";
import Groq from "groq-sdk";
import AISummary from "../models/AISummary.js";


const router = express.Router();

router.post("/summarize", async (req, res) => {
  const { title, description, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: "Title and URL are required" });
  }

  try {

    const cached = await AISummary.findOne({ url });

    if (cached) {
      console.log(`AI summary cache hit for ${title}`);
      return res.json({ summary: cached.summary, cached: true });
    }

 
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "GROQ_API_KEY missing" });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const prompt = `
Write a concise, professional news summary in paragraph form.
Tone should be neutral and informative, like a news editor.
Do not use bullet points.

Title: ${title}
Description: ${description || ""}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const summary = completion.choices[0].message.content;

    await AISummary.create({ url, summary });

    console.log("AI summary saved to MongoDB");

    res.json({ summary, cached: false });
  } catch (err) {
    console.error("AI ERROR:", err.message);
    res.status(500).json({ error: "AI summarization failed" });
  }
});

export default router;
