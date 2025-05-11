import express from 'express';
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());

app.get('/api/movies/:type', async (req, res) => {
  try {
    const { type } = req.params;         
    const url = `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`;
    const { data } = await axios.get(url);
    res.json(data.results);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'TMDB fetch failed' });
  }
});

app.get('/api/genres', async (_, res) => {
  try {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`;
    const { data } = await axios.get(url);
    res.json(data.genres);          
  } catch (err) {
    res.status(500).json({ error: 'Genre fetch failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on :${PORT}`));
