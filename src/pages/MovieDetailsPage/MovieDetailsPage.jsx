import { useEffect, useState, Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import toast from "react-hot-toast";

import { getMovieById, imagePathBase } from "../../Api/tmdb";
import useLoad from "../../hooks/useLoad";
import { HiMiniArrowLongLeft } from "react-icons/hi2";

function MovieDetailsPage() {
  const [movie, setMovie] = useState({});
  const { loading, setLoading, error, setError } = useLoad();
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!movieId) {
      setError(true);
      toast.error("Movie ID is not defined", { position: "top-right" });
      return;
    }

    async function fetchFilm() {
      setLoading(true);
      setError(false);
      try {
        const fetchMovie = await getMovieById(movieId);
        setMovie(fetchMovie);
      } catch (e) {
        setError(true);
        toast.error(e.message, { position: "top-right" });
      } finally {
        setLoading(false);
      }
    }

    fetchFilm();
  }, [movieId, setLoading, setError]);

  if (loading) {
    return (
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="color-ring-loading"
        wrapperClass="color-ring-wrapper mx-auto"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    );
  }

  if (error) {
    return <div>Error loading movie details.</div>;
  }

  return (
    <main className="mt-16">
      <div className="container mx-auto max-w-[700px]">
        <Link
          to={location.state ?? "/movies"}
          className="flex items-center gap-4 bg-violet-300 max-w-[max-content] py-3 px-6 rounded-md hover:bg-violet-400 hover:text-white duration-150"
        >
          <HiMiniArrowLongLeft /> Back to films
        </Link>
        <h1 className="text-6xl my-6 font-bold">{movie.title}</h1>
        <div className="main-info flex gap-7">
          <div className="img-wrapper h-96 flex-[0_0_16rem]">
            {movie.poster_path ? (
              <img
                src={imagePathBase + movie.poster_path}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                No Image Available
              </div>
            )}
          </div>
          <div className="info flex-col w-full">
            <div className="tagline flex mb-5">
              <span className="key font-semibold flex-[1_1_30%]">Tagline:</span>
              <span className="value flex-[1_1_70%]">
                {movie.tagline && movie.tagline.length > 0
                  ? movie.tagline
                  : "N/A"}
              </span>
            </div>
            <div className="genre flex mb-5">
              <span className="key font-semibold flex-[1_1_30%]">Genre:</span>
              <span className="value flex-[1_1_70%]">
                {movie.genres && movie.genres.length > 0
                  ? movie.genres.map((genre) => genre.name).join(", ")
                  : "N/A"}
              </span>
            </div>
            <div className="producers flex mb-5">
              <span className="key font-semibold flex-[1_1_30%]">
                Producers:
              </span>
              <span className="value flex-[1_1_70%]">
                {movie.production_companies &&
                movie.production_companies.length > 0
                  ? movie.production_companies
                      .map((prod) => prod.name)
                      .join(", ")
                  : "N/A"}
              </span>
            </div>
            <div className="overview flex mb-5">
              <span className="key font-semibold flex-[1_1_30%]">
                Overview:
              </span>
              <span className="value flex-[1_1_70%] max-h-56 overflow-hidden">
                {movie.overview?.length > 320
                  ? movie.overview.slice(0, 320) + "..."
                  : movie.overview}
              </span>
            </div>
          </div>
        </div>
        <div className="additional-info mt-8 flex justify-evenly items-center">
          <NavLink
            to={"cast"}
            state={location.state ?? "/movies"}
            className="bg-violet-400 p-4 rounded-md text-white transition-colors duration-150 hover:bg-violet-500"
          >
            Show cast
          </NavLink>
          <NavLink
            to={"reviews"}
            state={location.state ?? "/movies"}
            className="bg-violet-400 p-4 rounded-md text-white transition-colors duration-150 hover:bg-violet-500"
          >
            Show Reviews
          </NavLink>
        </div>
        <Suspense
          fallback={
            <ColorRing
              visible={true}
              height="100"
              width="100"
              ariaLabel="color-ring-loading"
              wrapperClass="color-ring-wrapper mx-auto"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
}

export default MovieDetailsPage;
