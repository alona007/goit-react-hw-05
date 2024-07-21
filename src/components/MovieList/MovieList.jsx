import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ films }) {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {films.map(({ id, title }) => {
        return (
          <li className={css.item} key={id}>
            <Link className={css.link} to={`/movies/${id}`} state={location}>
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
