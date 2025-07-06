const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Base URL from Consumet
const BASE_URL = "https://api.consumet.org/anime/gogoanime";

// Serve static files (optional)
app.use(express.static(path.join(__dirname, "public")));

// 🔍 Search Anime
app.get("/anime/gogo/search/:query", async (req, res) => {
  const { query } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/${encodeURIComponent(query)}`);
    res.json(response.data);
  } catch (err) {
    console.error("❌ Search Error:", err.message);
    res.status(500).json({ error: "Failed to search anime" });
  }
});

// 📄 Get Anime Info + Episodes
app.get("/anime/gogo/episodes/:animeId", async (req, res) => {
  const { animeId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/info/${animeId}`);
    res.json(response.data);
  } catch (err) {
    console.error("❌ Info Error:", err.message);
    res.status(500).json({ error: "Failed to fetch episodes" });
  }
});

// ▶️ Get Streaming Link
app.get("/anime/gogo/watch/:episodeId", async (req, res) => {
  const { episodeId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/watch/${episodeId}`);
    res.json(response.data);
  } catch (err) {
    console.error("❌ Watch Error:", err.message);
    res.status(500).json({ error: "Failed to get streaming link" });
  }
});

// 🌐 Optional: Redirect root to gogoanime.pe
app.get("/", (req, res) => {
  res.redirect("https://gogoanime.pe/");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
