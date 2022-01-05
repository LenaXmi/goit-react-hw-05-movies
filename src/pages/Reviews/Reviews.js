import { useState, useEffect } from "react";
import { useRouteMatch, Route } from "react-router-dom";
import * as API from "../../services/movies-api";

const Reviews = ({ movieId }) => {
  const { path } = useRouteMatch();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    API.fetchMovieReviews(movieId)
      .then((response) => setReviews(response.results))
      .catch((error) => console.log(error));
  }, [movieId]);
  return (
    <>
      <Route path={`${path}/reviews`}>
        {reviews && (
          <ul>
            {reviews.map(({ id, author, content }) => (
              <li key={id}>
                <h3>{author}</h3>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        )}
      </Route>
    </>
  );
};

export default Reviews;
