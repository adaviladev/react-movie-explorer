import { useState } from "react";

export default function SearchBar() {
  const [q, setQ] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    // For now, just log it. We’ll add routing/results later.
    console.log("Search query:", query);
  }

  return (
    <form className="search" role="search" onSubmit={onSubmit}>
      <input
        className="search_input"
        type="search"
        placeholder="Search movies..."
        aria-label="Search movies"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="search_button" type="submit" disabled={!q.trim()}>
        Search
      </button>
    </form>
  );
}
