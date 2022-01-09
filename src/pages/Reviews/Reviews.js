import { useState, useEffect } from "react";

import * as API from "../../services/movies-api";

const Reviews = ({ movieId }) => {
  // const { path } = useMatch();
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    API.fetchMovieReviews(movieId)
      .then((response) => setReviews(response.results), setStatus("resolved"))
      .catch((error) => setError(error));
  }, [movieId]);
  return (
    <>
      {status === "resolved" && reviews && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {status === "resolved" && reviews.length === 0 && (
        <p>There is no reviews for this movie</p>
      )}
      {status === "rejected" && <h1>{error && error.message} </h1>}
    </>
  );
};

export default Reviews;
