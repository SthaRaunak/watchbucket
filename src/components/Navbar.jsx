import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <section className="border-b-2 border-gray-500 py-3 bg-gradient-to-r from-indigo-900 from-10% via-purple-900 via-30% to-emerald-900 to-90%">
      <nav className="max-w-[1200px] mx-auto ps-3 pe-5">
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
