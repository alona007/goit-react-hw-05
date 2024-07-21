import { fetchCreditsByNavigationId } from "../../tmdb-api";
import { useParams } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
const ErrorMessage = lazy(() => import("../ErrorMessage/ErrorMessage.jsx"));
const Loader = lazy(() => import("../Loader/Loader"));
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [credits, setCredits] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  useEffect(() => {
    async function getActor() {
      try {
        setLoader(true);
        setError(false);
        const promise = await fetchCreditsByNavigationId(movieId);
        setCredits(promise.cast.slice(0, 3));
      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getActor();
  }, [movieId]);
  return (
    <>
      <Suspense fallback={<div>Loading page code...</div>}>
        {loader && <Loader />}
        {error && <ErrorMessage />}
      </Suspense>
      <ul className={css.list}>
        {credits.map((item) => {
          return (
            <li className={css.item} key={item.id}>
              <img
                src={"https://image.tmdb.org/t/p/w500/" + item.profile_path}
                alt={item.origin_name}
                className={css.image}
              />
              <p className={css.name}>{item.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
