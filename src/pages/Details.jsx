import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie, posterUrl } from "../api/tmdb";
import ErrorState from "../components/ErrorState";

function formatRuntime(min) {
  if (!min && min !== 0) return "—";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState(null);
  const [aborter, setAborter] = useState(null);

  const load = useCallback(() => {
    if (aborter) aborter.abort();
    const ac = new AbortController();
    setAborter(ac);

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
  }, [id, aborter]);

  useEffect(() => {
    load();
    return () => aborter?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (status === "loading") {
    return (
      <main className="container">
        <p>Loading…</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="container">
        <ErrorState
          message={`Could not load movie. ${error || ""}`}
          onRetry={load}
        />
        <p style={{ marginTop: 12 }}>
          <Link to="/">← Back</Link>
        </p>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="container">
        <p>Movie not found.</p>
        <p>
          <Link to="/">← Back</Link>
        </p>
      </main>
    );
  }

  const poster = posterUrl(movie.posterPath);

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
