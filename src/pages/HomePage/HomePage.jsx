import { lazy, Suspense, useEffect, useState } from "react";
import { fetchFilms } from "../../tmdb-api";
const ErrorMessage = lazy(
  () => import("../../components/ErrorMessage/ErrorMessage.jsx")
);
const Loader = lazy(() => import("../../components/Loader/Loader.jsx"));
const MovieList = lazy(
  () => import("../../components/MovieList/MovieList.jsx")
);

export default function HomePage() {
  const [film, setFilm] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getImages() {
      try {
        setLoader(true);
        setError(false);
        const promise = await fetchFilms();
        setFilm(promise.results);
      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getImages();
  }, []);
  return (
    <Suspense fallback={<div>Loading page code...</div>}>
      {loader && <Loader />}
      {error && <ErrorMessage />}
      <MovieList films={film} />
    </Suspense>
  );
}
