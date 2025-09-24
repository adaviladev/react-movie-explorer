import { Link } from "react-router-dom";
import { posterURL } from "../api/tmdb";

export default function MovieCard({ movie }) {
  const src = posterURL(movie.posterPath);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="card"
      role="article"
      aria-label={movie.title}
    >
      {src ? (
        <img className="card__poster" src={src} alt={`${movie.title} poster`} />
      ) : (
        <div className="card__poster" aria-hidden="true" />
      )}
      <div className="card__body">
        <p className="card__title">{movie.title}</p>
        <p className="card__meta">
          {movie.year} • ⭐ {movie.rating}
        </p>
      </div>
    </Link>
  );
}
