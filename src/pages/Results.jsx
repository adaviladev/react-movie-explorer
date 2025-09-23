import { useSearchParams } from "react-router-dom";

export default function Results() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";

  // temporary placeholders (we'll replace with real data later)
  const mock = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <main>
      <h2>Results for '{q}'</h2>
      {/* Grid will go here later */}
      <div className="results-grid">
        {mock.map((id) => (
          <div key={id} className="results-card" aria-hidden="true" />
        ))}
      </div>
    </main>
  );
}
