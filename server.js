const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const BASE_URL = "https://api.consumet.org/anime/gogoanime";

// 🔍 Search anime
app.get("/anime/gogo/search", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Missing query parameter" });

  try {
    const response = await axios.get(`${BASE_URL}/${encodeURIComponent(query)}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to search anime" });
  }
});

// 📺 Get episodes for an anime
app.get("/anime/gogo/episodes/:animeId", async (req, res) => {
  const { animeId } = req.params;

  try {
    const response = await axios.get(`${BASE_URL}/info/${animeId}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch episodes" });
  }
});

// ▶️ Get streaming URL from episode ID
app.get("/anime/gogo/watch/:episodeId", async (req, res) => {
  const { episodeId } = req.params;

  try {
    const response = await axios.get(`${BASE_URL}/watch/${episodeId}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to get streaming link" });
  }
});

app.get("/", (req, res) => {
  res.send("Anime Proxy is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
