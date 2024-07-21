import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import toast from "react-hot-toast";

import { getMoviesReviews } from "../../Api/tmdb";
import useLoad from "../../hooks/useLoad";

function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { loading, setLoading, error, setError } = useLoad();

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      setError(false);
      try {
        const getReviews = await getMoviesReviews(movieId);
        setReviews(getReviews);
      } catch (e) {
        setError(true);
        toast.error(e.message, {
          position: "top-right",
        });
      }
      setLoading(false);
    }

    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  return (
    <>
      <ul className="flex flex-col gap-6 m-4">
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
        {!loading &&
          !error &&
          reviews.map((review) => (
            <li key={review.id} className="bg-gray-200 px-6 py-4 rounded-md">
              <div className="info flex justify-evenly mb-4 text-sm italic">
                <div className="author ">Author: {review.author}</div>
                <div className="rating">
                  Rating: {review.rating > 0 ? review.rating : "N/A"}
                </div>
              </div>
              <div className="review text-lg">{review.content}</div>
            </li>
          ))}
      </ul>
      {reviews.length <= 0 && (
        <div className="text-center text-2xl">
          No one didn`t write review for film yet...
        </div>
      )}
    </>
  );
}

export default MovieReviews;
