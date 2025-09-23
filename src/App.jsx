import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Results from "./pages/Results";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<main>Home page</main>} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
