import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    navigate(`/results?q=${encodeURIComponent(query)}`);
  }

  return (
    <form className="search" role="search" onSubmit={onSubmit}>
      <input
        className="search__input"
        type="search"
        placeholder="Search movies..."
        aria-label="Search movies"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="search__button" type="submit" disabled={!q.trim()}>
        Search
      </button>
    </form>
  );
}
