import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import SearchedMovieList from "./SearchedMovieList";
import Search from "./Search";

function App() {
  const [query, setQuery] = useState("");
  console.log(query);
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
