import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../api/tmdb";
import ErrorState from "../components/ErrorState";
import SkeletonCard from "../components/SkeletonCard";

export default function Results() {
  const [params] = useSearchParams();
  const raw = params.get("q") || "";
  const q = raw.trim();

  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);
  const [aborter, setAborter] = useState(null);

  // 1) Definimos la función de carga para poder reutilizarla en Retry
  const load = useCallback(() => {
    if (!q) {
      setMovies([]);
      setStatus("idle");
      setError(null);
      return;
    }

    // cancelar petición anterior (si la hubiera)
    if (aborter) aborter.abort();
    const ac = new AbortController();
    setAborter(ac);

    setStatus("loading");
    setError(null);

    searchMovies(q)
      .then((res) => {
        if (!ac.signal.aborted) {
          setMovies(res);
          setStatus("success");
        }
      })
      .catch((err) => {
        if (!ac.signal.aborted) {
          setError(err.message);
          setStatus("error");
        }
      });
  }, [q, aborter]);

  // 2) Ejecutar cuando cambie la query
  useEffect(() => {
    load();
    return () => aborter?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <main className="container">
      <h2>Results for “{raw}”</h2>

      {status === "idle" && <p>Type something in the search box.</p>}
      {status === "loading" && (
        <div className="results-grid" aria-busy="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {status === "error" && (
        <ErrorState
          message={`Could not load results. ${error || ""}`}
          onRetry={load}
        />
      )}

      {status === "success" && movies.length === 0 && <p>No results found.</p>}

      {status === "success" && movies.length > 0 && (
        <div className="results-grid">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </main>
  );
}
