import axios from "axios";

const base = "https://api.themoviedb.org/3";
export const imagePathBase = "https://image.tmdb.org/t/p/w500";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzM5ZWM4NDA5YzRiYWYwMjczM2FjZDBhNmEzMWJjMSIsIm5iZiI6MTcyMTA3MTcwNC40MTgyMjgsInN1YiI6IjY2OTU3NjBiMzg1ZDc0NGM4ZTg3NWFkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OEknym9OEzCb2oqYxdttzadkoLpOkTF9_qCcSJnjRHU",
    accept: "application/json",
  },
};

export async function getTrendingMovies() {
  const response = await axios.get(`${base}/trending/movie/day`, options);
  return response.data;
}

export async function getMovieById(movieId) {
  const response = await axios.get(`${base}/movie/${movieId}`, options);
  return response.data;
}

export async function getMovieCredits(movieId) {
  const response = await axios.get(`${base}/movie/${movieId}/credits`, options);
  const data = response.data;
  return getPopularityCast(data.cast);
}

function getPopularityCast(cast, maxNumberOfCast = 5) {
  const sortedCast = cast.sort((a, b) => b.popularity - a.popularity);
  return sortedCast.slice(0, maxNumberOfCast);
}

export async function getMoviesReviews(movieId) {
  const response = await axios.get(`${base}/movie/${movieId}/reviews`, options);
  const reviews = response.data.results.map((review) => ({
    id: review.id,
    author: review.author,
    content: review.content,
    rating: review.author_details?.rating,
  }));
  return reviews;
}

export async function getMovieByName(query) {
  const response = await axios.get(
    `${base}/search/movie?query=${query}&include_adult=true`,
    options
  );
  return response.data.results;
}
