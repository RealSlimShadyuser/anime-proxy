const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Set the base URL for GogoAnime API via Consumet
const BASE_URL = "https://api.consumet.org/anime/gogoanime";

// Serve static files (like index.html) from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// 📺 Get episodes by anime ID
app.get("/anime/gogo/episodes/:animeId", async (req, res) => {
  const { animeId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/info/${animeId}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch episodes" });
  }
});

// ▶️ Get streaming link by episode ID
app.get("/anime/gogo/watch/:episodeId", async (req, res) => {
  const { episodeId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/watch/${episodeId}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to get streaming link" });
  }
});

// 🏠 Redirect homepage to GoGoAnime (OPTIONAL)
// If you want to show real gogoanime site when visiting root URL
app.get("/", (req, res) => {
  res.redirect("https://gogoanime.pe/");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
