require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const PROMPTS = require("./prompts");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/**
 * POST /api/chat
 * Body: { persona: "anshuman"|"abhimanyu"|"kshitij", messages: [{role, content}] }
 */
app.post("/api/chat", async (req, res) => {
  const { persona, messages } = req.body;

  if (!persona || !messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "persona and messages are required." });
  }

  const systemPrompt = PROMPTS[persona];
  if (!systemPrompt) {
    return res.status(400).json({ error: `Unknown persona: ${persona}` });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured on server." });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini", 
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.85,
        max_tokens: 600,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "Scaler Personas Chatbot",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("OpenRouter error:", err?.response?.data || err.message);
    const status = err?.response?.status || 500;
    const message =
      err?.response?.data?.error?.message ||
      "Something went wrong with the AI service. Please try again.";
    res.status(status).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
