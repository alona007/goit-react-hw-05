import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchFilmsByNavigationId } from "../../tmdb-api";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
const ErrorMessage = lazy(
  () => import("../../components/ErrorMessage/ErrorMessage")
);
const Loader = lazy(() => import("../../components/Loader/Loader"));
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [film, setFilm] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [genres, setGenres] = useState("");
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function getImages() {
      try {
        setLoader(true);
        setError(false);
        const promise = await fetchFilmsByNavigationId(movieId);
        setFilm(promise);
        setGenres(
          promise.genres.map((item) => {
            return item.name + " ";
          })
        );
      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getImages();
  }, [movieId]);

  return (
    <main>
      <Suspense fallback={<div>Loading page code...</div>}>
        {loader && <Loader />}
        {error && <ErrorMessage />}
      </Suspense>
      <Link className={css.backButton} to={backLinkRef.current}>
        Go back
      </Link>
      <section className={css.details}>
        <img
          className={css.image}
          src={"https://image.tmdb.org/t/p/w500/" + film.poster_path}
          alt={film.title}
        />
        <div className={css.information}>
          <h1>{film.title}</h1>
          <p>User score: {film.vote_average * 10}%</p>
          <h2>Overview</h2>
          <p>{film.overview}</p>
          <h3>Genres</h3>
          <p>{genres}</p>
        </div>
      </section>
      <section className={css.aditional}>
        <h2 className={css.aditionalTitle}>Aditional information</h2>
        <ul className={css.aditionalList}>
          <li className={css.aditionalItem}>
            <Link className={css.aditionalLink} to="cast">
              Cast
            </Link>
          </li>
          <li className={css.aditionalItem}>
            <Link className={css.aditionalLink} to="reviews">
              Reviews
            </Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading page code...</div>}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
}
