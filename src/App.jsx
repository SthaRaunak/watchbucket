import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import SearchedMovieList from "./components/SearchedMovieList";
import Search from "./components/Search";
import Loader from "./components/Loader";
import Movie from "./components/Movie";
import ErrorMessage from "./components/ErrorMessage";
import AppLayout from "./ui/AppLayout";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [error, setError] = useState(null);
  const [watched, setWatched] = useState([]);
  const [planToWatch, setPlanToWatch] = useState([]);
  const [watching, setWatching] = useState([]);

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
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        console.log(data.Search);
        if (data.Response === "False") throw new Error("No Results Found");
        setMovies(data.Search);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
          console.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    setError(null);

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

  const addWatched = (movie) => {
    setWatched((state) => [...state, movie]);
  };
  const addPlanToWatch = (movie) => {
    setPlanToWatch((state) => [...state, movie]);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/search" />} />
            <Route
              path="/movies/:id"
              element={
                <Movie
                  addWatched={addWatched}
                  addPlanToWatch={addPlanToWatch}
                />
              }
            />
            <Route
              path="/search"
              element={
                <Home>
                  <Search query={query} setQuery={setQuery} />
                  {isLoading && <Loader />}
                  {error && <ErrorMessage errorMessage={error} />}
                  {!isLoading && !error && (
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
