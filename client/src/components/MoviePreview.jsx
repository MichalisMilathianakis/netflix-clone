import { useEffect, useState } from "react";
import {
  getMovieDetails,
  getMovieVideos,
  getMovieReviews,
  getSimilarMovies,
} from "../api/tmdb";
import ReactPlayer from "react-player/youtube";
import MovieMiniCard from "./MovieMiniCard";

export default function MoviePreview({ movieId, onPickSimilar }) {
  const [data, setData] = useState({
    details: null,
    trailer: null,
    reviews: [],
    similar: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const [
          { data: details },
          { data: videos },
          { data: reviews },
          { data: similar },
        ] = await Promise.all([
          getMovieDetails(movieId),
          getMovieVideos(movieId),
          getMovieReviews(movieId),
          getSimilarMovies(movieId),
        ]);

        const trailer = videos.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );

        setData({
          details,
          trailer,
          reviews: reviews.results.slice(0, 2),
          similar: similar.results.slice(0, 6),
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [movieId]);

  if (!data.details) return <p className="p-6">Loading…</p>;

  const { details, trailer, reviews, similar } = data;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          {details.title}{" "}
          <span className="text-sm text-gray-400">
            ({details.release_date.slice(0, 4)})
          </span>
        </h2>
        <p className="text-sm text-gray-300 mt-1">
          Rating&nbsp;•&nbsp;
          <span className="font-medium">
            {details.vote_average.toFixed(1)}
          </span>
          /10 (based on {details.vote_count} votes)
        </p>
      </div>

      {trailer && (
        <div className="aspect-video">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer.key}`}
            width="100%"
            height="100%"
            controls
          />
        </div>
      )}

      <p className="text-sm leading-relaxed text-gray-200">
        {details.overview}
      </p>

      {reviews.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Reviews</h3>
          {reviews.map((r) => (
            <blockquote
              key={r.id}
              className="text-sm italic text-gray-300 border-l-4 border-gray-600 pl-3"
            >
              “{r.content.slice(0, 280)}
              {r.content.length > 280 && "…"}”
              <footer className="mt-1 text-xs text-gray-400">
                — {r.author}
              </footer>
            </blockquote>
          ))}
        </div>
      )}

      {similar.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Similar titles</h3>
          <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
            {similar.map((m) => (
              <MovieMiniCard
                key={m.id}
                movie={m}
                onClick={() => onPickSimilar?.(m.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
