import { fetchReviewsByNavigationId } from "../../tmdb-api";
import { useParams } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
const ErrorMessage = lazy(() => import("../ErrorMessage/ErrorMessage"));
const Loader = lazy(() => import("../Loader/Loader"));
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [credits, setCredits] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  useEffect(() => {
    async function getReviews() {
      try {
        setLoader(true);
        setError(false);
        const promise = await fetchReviewsByNavigationId(movieId);
        setCredits(promise.results.slice(0, 3));
      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getReviews();
  }, [movieId]);

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.substring(0, num) + "...";
  };

  return (
    <>
      <Suspense fallback={<div>Loading page code...</div>}>
        {loader && <Loader />}
        {error && <ErrorMessage />}
      </Suspense>
      <ul className={css.list}>
        {credits.length !== 0 ? (
          credits.map((item) => {
            return (
              <li className={css.item} key={item.id}>
                <h2 className={css.title}>Author: {item.author}</h2>
                <p className={css.content}>
                  {truncateString(item.content, 500)}
                </p>
              </li>
            );
          })
        ) : (
          <div> No reviews found</div>
        )}
      </ul>
    </>
  );
}
