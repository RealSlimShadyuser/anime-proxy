const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

const BASE_URL = 'https://api.consumet.org/anime/animepahe';

app.get('/watch/:episodeId', async (req, res) => {
  const episodeId = req.params.episodeId;
  try {
    const { data } = await axios.get(`https://api.consumet.org/anime/animepahe/watch/${episodeId}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch episode' });
  }
});

app.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const { data } = await axios.get(`${BASE_URL}?query=${query}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
