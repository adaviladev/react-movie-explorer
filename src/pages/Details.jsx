/* import { useParams, Link } from "react-router-dom";

const mockMovies = [
  { id: 1, title: "Inception", year: 2010, rating: 8.8 },
  { id: 2, title: "Interstellar", year: 2014, rating: 8.6 },
  { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0 },
  { id: 4, title: "The Matrix", year: 1999, rating: 8.7 },
  { id: 5, title: "Dune", year: 2021, rating: 8.1 },
  { id: 6, title: "Arrival", year: 2016, rating: 7.9 },
];

export default function Details() {
  const { id } = useParams();
  const movie = mockMovies.find((m) => String(m.id) === id);

  if (!movie) {
    return (
      <main>
        <p>Movie not found</p>
        <p>
          <Link to="/">← Back to Home</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="details">
        <div className="details__poster" aria-hidden="true" />
        <div>
          <h1 className="details__title">
            {movie.title} ({movie.year})
          </h1>
          <p className="details__meta">⭐ {movie.rating} • Genres • Runtime</p>
          <p className="details__overview">
            Overview placeholder. This will be replaced with TMDB data.
          </p>
          <p>
            <Link to="/">← Back</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie, posterURL } from "../api/tmdb";

function formatRuntime(min) {
  if (!min && min !== 0) return "—";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    setStatus("loading");
    setError(null);
    getMovie(id)
      .then((data) => {
        if (!ac.signal.aborted) {
          setMovie(data);
          setStatus("success");
        }
      })
      .catch((err) => {
        if (!ac.signal.aborted) {
          setError(err.message);
          setStatus("error");
        }
      });
    return () => ac.abort();
  }, [id]);

  if (status === "loading") {
    return (
      <main className="container">
        <p>Loading...</p>
      </main>
    );
  }

  if (status === "error" || !movie) {
    return (
      <main className="container">
        <p role="alert">Could not load movie. {error ?? ""}</p>
        <p>
          <Link to="/">← Back</Link>
        </p>
      </main>
    );
  }

  const poster = posterURL(movie.posterPath);

  return (
    <main className="container">
      <div className="details">
        {poster ? (
          <img
            className="details__poster"
            src={poster}
            alt={`${movie.title} poster`}
          />
        ) : (
          <div className="details__poster" aria-hidden="true" />
        )}
        <div>
          <h1 className="details__title">
            {movie.title} ({movie.year})
          </h1>
          <p className="details__meta">
            ⭐ {movie.rating} • {movie.genres.join(", ") || "Genres —"} •{" "}
            {formatRuntime(movie.runtime)}
          </p>
          <p className="details__overview">{movie.overview}</p>
          <p style={{ marginTop: 12 }}>
            <Link to="/">← Back</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
