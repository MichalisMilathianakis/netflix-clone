import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import {
  getGenres,
  getNowPlaying,
  searchMovies,
  mergeUniq,
} from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import NavBar from "../components/NavBar";
import Modal from "../components/Modal";

export default function Home() {

  const [genreMap, setGenreMap] = useState({});
  useEffect(() => {
    getGenres().then(({ data }) => {
      const map = {};
      data.genres.forEach((g) => (map[g.id] = g.name));
      setGenreMap(map);
    });
  }, []);

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalId, setModalId] = useState(null);

  const fetchPage = async (p = 1, q = query) => {
    const req = q ? searchMovies(q, p) : getNowPlaying(p);
    const { data } = await req;
    setMovies((cur) => (p === 1 ? data.results : mergeUniq(cur, data.results)));
    setTotalPages(data.total_pages);
    setPage(p + 1);
  };

  const debouncedSearch = useCallback(
    debounce((text) => fetchPage(1, text), 400),
    []
  );
  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  const loadMore = useCallback(() => {
    if (page <= totalPages) fetchPage(page);
  }, [page, totalPages, query]);
  useInfiniteScroll(loadMore, page <= totalPages);

  return (
    <>
      <NavBar value={query} onChange={(e) => setQuery(e.target.value)} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              genreMap={genreMap}
              onSelect={(id) => setModalId(id)}
            />
          ))}
        </div>

        {page <= totalPages && (
          <p className="text-center mt-6 text-sm text-gray-400">Loading …</p>
        )}
      </div>

      <Modal
        movieId={modalId}
        onClose={() => setModalId(null)}
        onPickNext={(id) => setModalId(id)}
      />
    </>
  );
}
