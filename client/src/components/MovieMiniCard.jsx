const IMG = "https://image.tmdb.org/t/p/w300";
export default function MovieMiniCard({ movie, onClick }) {
  return (
    <img
      src={`${IMG}${movie.poster_path}`}
      alt={movie.title}
      title={movie.title}
      onClick={onClick}
      className="cursor-pointer w-full aspect-[2/3] object-cover rounded-md hover:opacity-80"
    />
  );
}
