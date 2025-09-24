const BASE = "https://api.themoviedb.org/3";
const KEY = import.meta.env.VITE_TMDB_API_KEY;

/**
 * Search movies by title. Returns a small, UI-ready shape.
 */
export async function searchMovies(query, page = 1) {
  // 1) Build the URL and query string
  const url = new URL(`${BASE}/search/movie`);
  url.searchParams.set("api_key", KEY); // 2) add your API key
  url.searchParams.set("query", query); // 3) user query
  url.searchParams.set("page", String(page));
  url.searchParams.set("include_adult", "false");

  // 4) Fetch and basic error handling
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB error ${res.status}`);

  // 5) Parse JSON and map to a lean shape for the UI
  const data = await res.json();
  return data.results.map((m) => ({
    id: m.id,
    title: m.title ?? m.name ?? "Untitled",
    year: (m.release_date || "").slice(0, 4) || "—",
    rating: m.vote_average?.toFixed(1) ?? "—",
    posterPath: m.poster_path || null,
  }));
}

/** Build a poster URL or return null if missing */
export function posterURL(path, size = "w342") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}
