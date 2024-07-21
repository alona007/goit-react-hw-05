import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../Api/tmdb";
import MovieList from "../../components/MovieList/MovieList";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTrendingMovies() {
      setLoading(true);
      setError(false);
      try {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies.results);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }

    fetchTrendingMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movies.</div>;
  }

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
