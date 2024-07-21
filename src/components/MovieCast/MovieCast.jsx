import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits, imagePathBase } from "../../Api/tmdb";
import useLoad from "../../hooks/useLoad";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

function MovieCast() {
  const [casts, setCasts] = useState([]);
  const { loading, setLoading, error, setError } = useLoad();
  const { movieId } = useParams();

  useEffect(() => {
    console.log("movieId:", movieId); // Log movieId to ensure it's received

    if (!movieId) {
      setError(true);
      toast.error("Movie ID is not defined", {
        position: "top-right",
      });
      console.error("Movie ID is not defined");
      return;
    }

    async function fetchCast() {
      setLoading(true);
      setError(false);
      try {
        const movieCast = await getMovieCredits(movieId);
        setCasts(movieCast);
        if (movieCast.length === 0) {
          toast.error("No cast information found", {
            position: "top-right",
          });
        }
      } catch (e) {
        setError(true);
        toast.error(e.message, {
          position: "top-right",
        });
        console.error("Error fetching cast information:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId, setLoading, setError]);

  return (
    <ul className="casts-list flex flex-wrap gap-6 my-10">
      {loading && (
        <div className="color-ring-wrapper mx-auto">
          <ColorRing
            visible={true}
            height={100}
            width={100}
            ariaLabel="color-ring-loading"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      {!loading &&
        !error &&
        casts.length > 0 &&
        casts.map((cast) => (
          <li
            key={cast.id}
            className="cast-item flex-[1_1_calc((100%-48px)_/_3)] border-2 border-gray-300 border-solid p-2 rounded-md"
          >
            <div className="cast-info flex flex-col">
              <figure className="cast-image-wrapper w-full">
                {cast.profile_path ? (
                  <img
                    src={imagePathBase + cast.profile_path}
                    alt={cast.name}
                    className="object-cover w-full h-72"
                  />
                ) : (
                  <div className="placeholder-image w-full h-72 bg-gray-200"></div>
                )}
                <figcaption className="text-xl font-semibold text-center">
                  {cast.name}
                </figcaption>
              </figure>
              <span className="character text-sm text-center">
                Character: {cast.character}
              </span>
            </div>
          </li>
        ))}
      {!loading && error && <p>Failed to load cast information.</p>}
    </ul>
  );
}

export default MovieCast;
