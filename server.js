const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const BASE_URL = 'https://api.consumet.org/anime/animepahe';

// Route to get episodes for an anime by ID
app.get('/episodes/:animeId', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/info/${req.params.animeId}`);
    res.json(response.data);
  } catch (err) {
    console.error('Episode fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch episodes' });
  }
});

// Route to get streaming links for an episode by ID
app.get('/watch/:episodeId', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/watch/${req.params.episodeId}`);
    res.json(response.data);
  } catch (err) {
    console.error('Watch URL fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch stream URL' });
  }
});

// Fallback route
app.get('/', (req, res) => {
  res.send('Anime Proxy is running 🎬');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
