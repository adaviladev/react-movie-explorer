// src/api/tmdb.jsx
const BASE = 'https://api.themoviedb.org/3';
const KEY = import.meta.env.VITE_TMDB_API_KEY;

/** Construye la URL de un póster o devuelve null si no hay */
export function posterUrl(path, size = 'w342') {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}

/** Buscar películas por texto y devolver un shape reducido para la UI */
export async function searchMovies(query, page = 1) {
  const url = new URL(`${BASE}/search/movie`);
  url.searchParams.set('api_key', KEY);
  url.searchParams.set('query', query);
  url.searchParams.set('page', String(page));
  url.searchParams.set('include_adult', 'false');

  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB error ${res.status}`);

  const data = await res.json();
  return data.results.map(m => ({
    id: m.id,
    title: m.title ?? m.name ?? 'Untitled',
    year: (m.release_date || '').slice(0, 4) || '—',
    rating: m.vote_average?.toFixed(1) ?? '—',
    posterPath: m.poster_path || null,
  }));
}

/** Obtener detalles de una película por id (shape reducido para la UI) */
export async function getMovie(id) {
  const url = new URL(`${BASE}/movie/${id}`);
  url.searchParams.set('api_key', KEY);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB error ${res.status}`);

  const m = await res.json();
  return {
    id: m.id,
    title: m.title ?? 'Untitled',
    year: (m.release_date || '').slice(0, 4) || '—',
    rating: m.vote_average?.toFixed(1) ?? '—',
    posterPath: m.poster_path || null,
    runtime: m.runtime ?? null,
    genres: Array.isArray(m.genres) ? m.genres.map(g => g.name) : [],
    overview: m.overview || '—',
  };
}
