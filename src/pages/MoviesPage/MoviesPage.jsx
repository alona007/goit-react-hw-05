import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

import { getMovieByName } from "../../Api/tmdb";

import useLoad from "../../hooks/useLoad";

import MovieList from "../../components/MovieList/MovieList";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [noMovies, setNoMovies] = useState(false);

  const { loading, setLoading, error, setError } = useLoad();

  const [searchParams, setSearchParams] = useSearchParams({ query: "" });

  useEffect(() => {
    async function fetchMovies(queryString) {
      if (queryString === "") return;

      try {
        const getMovies = await getMovieByName(queryString);

        if (getMovies.length === 0) {
          setNoMovies(true);
          setMovies([]);
        } else {
          setNoMovies(false);
          setMovies(getMovies);
        }
      } catch (e) {
        setError(true);
        toast.error(e.message, {
          position: "top-right",
        });
      }
      setLoading(false);
    }

    fetchMovies(searchParams.get("query"));
  }, [searchParams, setLoading, setError]);

  function submitHandler(e) {
    e.preventDefault();

    const queryString = e.target.elements.searchFilm.value.trim();

    if (queryString.length < 2) {
      toast.error("Please, input 2 symbols at least", {
        position: "top-right",
      });
      return;
    }

    setError(false);
    setLoading(true);

    setSearchParams({ query: queryString });
  }

  return (
    <main className="flex flex-col justify-start items-center gap-12 h-[100vh] mt-16 ">
      <form className="flex w-1/2" onSubmit={submitHandler}>
        <input
          type="text"
          name="searchFilm"
          id="searchFilm"
          placeholder="Search movie here"
          className="w-full bg-violet-100 p-4 rounded-md placeholder-slate-900
          focus:outline-none focus:ring-2 ring-pink-600 mr-2"
          defaultValue={searchParams.get("query")}
        />
        <button
          type="submit"
          className="bg-pink-400 px-4 rounded-md text-white 
          hover:bg-pink-600 transition-colors duration-150
          focus:outline-none focus:ring-2 ring-pink-600 disabled:bg-slate-500"
          disabled={loading}
        >
          Search
        </button>
      </form>

      {loading && (
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper mx-auto"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}

      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}

      {!loading && noMovies && (
        <p>Any movies did not find according to your query</p>
      )}
    </main>
  );
}

export default MoviesPage;
