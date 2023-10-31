import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SearchedMovieList from "./components/SearchedMovieList";
import Search from "./components/Search";
import Loader from "./components/Loader";
import Movie from "./components/Movie";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");

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

  let sortedMovies;

  if (sortBy === "relevance") sortedMovies = movies?.slice();

  if (sortBy === "title")
    sortedMovies = movies
      ?.slice()
      .sort((a, b) => a.Title.localeCompare(b.Title));

  if (sortBy === "date")
    sortedMovies = movies
      ?.slice()
      .sort(
        (a, b) =>
          (b.Year.length > 4 ? b.Year.slice(0, 4) : b.Year) -
          (a.Year.length > 4 ? a.Year.slice(0, 4) : a.Year)
      );

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/:id" element={<Movie />} />

          <Route
            path="/"
            element={
              <Home>
                <Search query={query} setQuery={setQuery} />
                {isLoading ? (
                  <Loader />
                ) : (
                  <SearchedMovieList
                    movies={sortedMovies}
                    setSortBy={setSortBy}
                    sortBy={sortBy}
                  />
                )}
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
