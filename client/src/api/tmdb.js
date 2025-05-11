import axios from "axios";

const key  = import.meta.env.VITE_TMDB_KEY;
const base = "https://api.themoviedb.org/3";

const instance = axios.create({
  baseURL: base,
  params: { api_key: key, language: "en-US" },
});

export const getNowPlaying  = (page = 1)       => instance.get("/movie/now_playing", { params: { page } });
export const searchMovies   = (query, page=1)  => instance.get("/search/movie",   { params: { query, page, include_adult:false } });
export const getGenres      = ()               => instance.get("/genre/movie/list");

export const getMovieDetails  = (id)           => instance.get(`/movie/${id}`);
export const getMovieVideos   = (id)           => instance.get(`/movie/${id}/videos`);
export const getMovieReviews  = (id, page=1)   => instance.get(`/movie/${id}/reviews`, { params:{page} });
export const getSimilarMovies = (id, page=1)   => instance.get(`/movie/${id}/similar`, { params:{page} });

export function mergeUniq(prev, next) {
  const map = new Map(prev.map((m) => [m.id, m]));
  next.forEach((m) => map.set(m.id, m));
  return Array.from(map.values());
}