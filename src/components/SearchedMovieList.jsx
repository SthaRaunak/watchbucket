function SearchedMovieList({ movies }) {
  return (
    <div className="max-w-[1200px] mx-auto px-5 pt-9">
      <div className="flex w-full mt-5 border-b-[1px] border-gray-600">
        <h5 className="w-[15%]">Year</h5>
        <h5 className="w-[75%]">Title</h5>
        <h5 className="w-[10%]">Type</h5>
      </div>
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </div>
  );
}

function Movie({ movie }) {
  return (
    <div className="flex w-full py-5 border-b-[1px] border-gray-700 items-center cursor-pointer">
      <p className="w-[15%] text-gray-400 text-sm">{movie.Year}</p>
      <div className="w-[75%] flex gap-5 items-center">
        <img src={movie.Poster} alt="" className="w-[50px] h-[75px]" />
        <h5 className="md:text-[1.2rem] text-gray-200 pe-3">{movie.Title}</h5>
      </div>
      <p className="w-[10%]  text-gray-400 text-sm">{movie.Type}</p>
    </div>
  );
}

export default SearchedMovieList;
