import { useSearchParams } from "react-router-dom";

export default function Results() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";

  return (
    <main>
      <h2>Results for '{q}'</h2>
      {/* Grid will go here later */}
    </main>
  );
}
