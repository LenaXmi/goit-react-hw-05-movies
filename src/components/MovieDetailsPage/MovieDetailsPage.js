import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useRouteMatch, Route, Link } from "react-router-dom";
import * as API from "../../services/movies-api";
import s from "./MovieDetailsPage.module.css";

const Cast = lazy(() => import("../Cast/Cast" /* webpackChunkName: 'cast' */));
const Reviews = lazy(() =>
  import("../Reviews/Reviews" /* webpackChunkName: 'reviews' */)
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    if (movieId === "") {
      return;
    }

    API.fetchMovieDetails(movieId).then(setMovieData);
  }, [movieId]);

  return (
    <>
      {movieData && (
        <>
          <h1>{movieData.title}</h1>
          <img
            className={s.img}
            src={`https://image.tmdb.org/t/p/w342${movieData.poster_path}`}
            alt="poster"
          />
        </>
      )}
      <hr />
      <Link to={`${url}/cast`}>Cast</Link>
      <Link to={`${url}/reviews`}>Reviews</Link>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Route path={path}>
          <Cast movieId={movieId} />
          <Reviews movieId={movieId} />
        </Route>
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
