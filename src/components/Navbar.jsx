function Navbar() {
  return (
    <section className="bg-slate-900 py-5">
      <nav className="max-w-[1200px] mx-auto px-5">
        <div className="flex justify-between text-white items-center">
          <h2 className="font-medium text-[1.9rem]">
            <span className="text-[2.2rem]">🎬</span>watchBucket
          </h2>
          <div className="flex gap-5 items-center text-lg">
            <button>Search</button>
            <p>Dashboard</p>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Navbar;
