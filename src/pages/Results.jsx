// import { useSearchParams } from "react-router-dom";
// import MovieCard from "../components/MovieCard";

// const mockMovies = [
//   { id: 1, title: "Inception", year: 2010, rating: 8.8 },
//   { id: 2, title: "Interstellar", year: 2014, rating: 8.6 },
//   { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0 },
//   { id: 4, title: "The Matrix", year: 1999, rating: 8.7 },
//   { id: 5, title: "Dune", year: 2021, rating: 8.1 },
//   { id: 6, title: "Arrival", year: 2016, rating: 7.9 },
// ];

// export default function Results() {
//   const [params] = useSearchParams();
//   const q = (params.get("q") || "").toLowerCase();

//   const filtered = mockMovies.filter((m) => m.title.toLowerCase().includes(q));

//   return (
//     <main className="container">
//       <h2>Results for "{params.get("q") || ""}"</h2>
//       {/* Grid will go here later */}
//       <div className="results-grid">
//         {filtered.map((m) => (
//           <MovieCard key={m.id} movie={m} />
//         ))}
//       </div>
//     </main>
//   );
// }

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../api/tmdb";

export default function Results() {
  const [params] = useSearchParams();
  const raw = params.get("q") || "";
  const q = raw.trim();

  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!q) {
      setMovies([]);
      setStatus("idle");
      setError(null);
      return;
    }

    const ac = new AbortController(); // 1) abort if the query changes fast
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
    return () => ac.abort(); // 2) cancel pending fetch on unmount/change
  }, [q]);

  return (
    <main className="container">
      <h2>Results for '{raw}'</h2>

      {status === "idle" && <p>Type something in the search box.</p>}
      {status === "loading" && <p>Loading…</p>}
      {status === "error" && (
        <p role="alert">
          Could not load results. {error} <br />
          Please try again.
        </p>
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
