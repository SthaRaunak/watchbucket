import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import SearchedMovieList from "./SearchedMovieList";
import Search from "./Search";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&${
            query ? "s=" + query : "s=movies"
          }`
        );
        const data = await res.json();
        console.log(data);
        setMovies(data.Search);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchMovies();
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
                <SearchedMovieList />
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
