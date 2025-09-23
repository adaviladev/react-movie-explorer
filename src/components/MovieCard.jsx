import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="card"
      role="article"
      aria-label="{movie.title}"
    >
      <div className="card__poster" aria-hidden="true" />
      <div className="card__body">
        <p className="card__title">{movie.title}</p>
        <p className="card__meta">
          {movie.year} • ⭐ {movie.rating}
        </p>
      </div>
    </Link>
  );
}
