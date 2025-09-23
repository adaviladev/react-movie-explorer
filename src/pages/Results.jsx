import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const mockMovies = [
  { id: 1, title: "Inception", year: 2010, rating: 8.8 },
  { id: 2, title: "Interstellar", year: 2014, rating: 8.6 },
  { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0 },
  { id: 4, title: "The Matrix", year: 1999, rating: 8.7 },
  { id: 5, title: "Dune", year: 2021, rating: 8.1 },
  { id: 6, title: "Arrival", year: 2016, rating: 7.9 },
];

export default function Results() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();

  const filtered = mockMovies.filter((m) => m.title.toLowerCase().includes(q));

  return (
    <main className="container">
      <h2>Results for "{params.get("q") || ""}"</h2>
      {/* Grid will go here later */}
      <div className="results-grid">
        {filtered.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </main>
  );
}
