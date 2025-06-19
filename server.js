import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// === POST Endpoint for OpenRouter ===
app.post("/openrouter", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: "No prompt provided" });

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",  // You can change the model here
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content || "No reply received";
    res.json({ reply });

  } catch (error) {
    console.error("OpenRouter Error:", error);
    res.status(500).json({ error: "Failed to get response from OpenRouter API" });
  }
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
