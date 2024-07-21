import PropTypes from "prop-types";
import MovieItem from "../MovieItem/MovieItem";

function MovieList({ movies }) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id} className="movie-list-item">
          <MovieItem movie={movie} />
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
