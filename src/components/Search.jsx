function Search({ query, setQuery }) {
  return (
    <>
      <section className="bg-slate-800 h-full border-b-gray-500 border-b-2">
        <div className="max-w-[1200px] mx-auto px-5">
          <input
            type="text"
            className="text-5xl py-8 outline-none px-3 bg-slate-800 text-white font-extralight w-full"
            placeholder="Type to find movies, TV show, anime"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </section>
    </>
  );
}

export default Search;
