import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <section className="bg-slate-900 py-5">
      <nav className="max-w-[1200px] mx-auto px-5">
        <div className="flex justify-between text-white items-center">
          <Logo />
          <NavItems />
        </div>
      </nav>
    </section>
  );
}

function Logo() {
  return (
    <h2 className="font-medium text-[1.9rem]">
      <Link to="/">
        {" "}
        <span className="text-[2.2rem]">🎬</span>watchBucket
      </Link>
    </h2>
  );
}

function NavItems() {
  return (
    <div className="flex gap-5 items-center text-lg">
      <button>
        <NavLink to="/">Search</NavLink>
      </button>
      <p>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </p>
    </div>
  );
}
export default Navbar;
