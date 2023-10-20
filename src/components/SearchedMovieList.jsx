function SearchedMovieList({ movies }) {
  return (
    <div className="max-w-[1200px] mx-auto px-5">
      {movies?.map((movie) => (
        <h2 className="text-2xl" key={movie.imdbID}>
          {movie.Title}
        </h2>
      ))}
    </div>
  );
}

export default SearchedMovieList;
