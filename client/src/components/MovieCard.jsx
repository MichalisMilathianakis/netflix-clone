const IMG = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, genreMap, onSelect }) {
  return (
    <div
      onClick={() => onSelect(movie.id)}
      className="cursor-pointer bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
    >
      <img
        src={`${IMG}${movie.poster_path}`}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover"
      />
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold leading-tight">
          {movie.title}
          <span className="text-sm text-gray-400 ml-1">
            ({movie.release_date.slice(0, 4)})
          </span>
        </h3>
        <p className="text-xs text-gray-400 line-clamp-1">
          {movie.genre_ids.map((id) => genreMap[id]).join(", ")}
        </p>
        <p className="text-xs">
          <span className="font-medium">Rating:</span>{" "}
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
}
