import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <header
      className="bg-violet-500 text-neutral-200 text-xl 
        font-semibold shadow-md fixed top-0 right-0 w-full z-10"
    >
      <div className="container">
        <nav className="flex gap-x-8 *:p-3">
          <NavLink
            to="/"
            className="hover:bg-violet-700
             hover:text-neutral-50 transition-colors 
             duration-150 focus:outline-none focus:ring-2 ring-violet-800"
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className="hover:bg-violet-700
             hover:text-neutral-50 transition-colors 
             duration-150 focus:outline-none focus:ring-2 ring-violet-800"
          >
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
