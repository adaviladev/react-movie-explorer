import { useParams, Link } from "react-router-dom";

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
    <main>
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
