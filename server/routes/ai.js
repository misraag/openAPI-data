import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

const summaryCache = {};

router.post("/summarize", async (req, res) => {
  const { title, description, url } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (summaryCache[url]) {
    return res.json({ summary: summaryCache[url], cached: true });
  }

  try {
    // ✅ Instantiate Groq HERE (after env is loaded)
    if (!process.env.GROQ_API_KEY) {
      console.error("❌ GROQ_API_KEY missing in production");
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

    summaryCache[url] = summary;

    res.json({ summary, cached: false });
  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI summarization failed" });
  }
});

export default router;
