import { useState, useEffect } from "react";
import { useRouteMatch, Link, Route } from "react-router-dom";
import * as API from "../../services/movies-api";

const Reviews = ({ movieId }) => {
  const { url, path } = useRouteMatch();
  const [reviews, setReviews] = useState(null);
  console.log(useRouteMatch());
  useEffect(() => {
    API.fetchMovieReviews(movieId).then((response) =>
      setReviews(response.results)
    );
  }, [movieId]);
  return (
    <>
      <Link to={`${url}/reviews`}>
        {" "}
        <h2>Reviews</h2>{" "}
      </Link>
      <Route path={`${path}/reviews`}>
        {reviews && (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        )}
      </Route>
    </>
  );
};

export default Reviews;
