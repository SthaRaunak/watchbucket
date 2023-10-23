function Search({ query, setQuery }) {
  const handlePaste = async () => {
    if (!query) {
      const text = await navigator.clipboard.readText();
      setQuery(text);
    } else if (query) {
      setQuery("");
    }
  };

  return (
    <>
      <section className="bg-[#0c0f11] h-full border-b-gray-500 border-b-[1px]">
        <div className="max-w-[1200px] mx-auto px-5 flex items-center gap-14">
          <input
            type="text"
            className={`text-5xl ${
              !query ? "py-9" : "py-5"
            } outline-none  bg-transparent text-white font-extralight w-[85%]`}
            placeholder="Type to find movies, TV show, anime"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="text-lg text-[#9DA2AF] h-full"
            onClick={handlePaste}
          >
            {query ? "CLEAR" : "PASTE"}
          </button>
        </div>
      </section>
    </>
  );
}

export default Search;
