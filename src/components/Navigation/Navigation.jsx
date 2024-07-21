import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const linkClasses = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav className={css.navLink}>
      <NavLink className={linkClasses} to="/">
        Home
      </NavLink>
      <NavLink className={linkClasses} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
}
