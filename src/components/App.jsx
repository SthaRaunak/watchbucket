import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import SearchedMovieList from "./SearchedMovieList";
import Search from "./Search";
import Loader from "./Loader";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&${
            query ? "s=" + query : "s=movies"
          }`,
          { signal: controller.signal }
        );
        const data = await res.json();
        console.log(data.Search);
        setMovies(data.Search);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home>
                <Search query={query} setQuery={setQuery} />
                {isLoading ? <Loader /> : <SearchedMovieList movies={movies} />}
              </Home>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
