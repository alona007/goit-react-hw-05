import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { imagePathBase } from "../../Api/tmdb";

function MovieItem({ movie }) {
  const location = useLocation();

  return (
    <div className="card">
      <Link to={"/movies/" + movie.id} state={location}>
        <div className="image-wrapper h-96 relative rounded-t-lg overflow-hidden">
          {movie.adult && (
            <div
              className="adult rounded-full bg-red-500 w-14 h-14
            flex justify-center items-center text-xl text-neutral-200 
            font-bold absolute top-3 right-3 shadow-md"
            >
              <span>18+</span>
            </div>
          )}
          <img
            src={imagePathBase + "/" + movie.poster_path}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div
            className="rating rounded-md text-neutral-100 text-xl
        bg-slate-800/70 px-8 py-3 absolute bottom-2 left-[50%] translate-x-[-50%]
        2xl:py-2 2xl:px-4"
          >
            Rate:{" "}
            <span className="text-yellow-400">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        <div className="card-title text-xl text-center my-3">{movie.title}</div>
      </Link>
    </div>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.object,
};

export default MovieItem;
