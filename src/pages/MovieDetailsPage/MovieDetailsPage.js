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
  const [movieData, setMovieData] = useState([]);

  const { poster_path, title, release_date, vote_average, overview, genres } =
    movieData;

  useEffect(() => {
    if (movieId === "") {
      return;
    }

    API.fetchMovieDetails(movieId)
      .then(setMovieData)
      .catch((error) => console.log(error));
  }, [movieId]);

  return (
    <>
      {movieData && (
        <div className={s.movieContainer}>
          <img
            className={s.poster}
            src={`https://image.tmdb.org/t/p/w342${poster_path}`}
            alt="poster"
          />

          <div className={s.infoContainer}>
            <h1>
              {title} ({new Date(release_date).getFullYear()})
            </h1>
            <hr />
            <p>User score: {vote_average}</p>

            <h2>Overview</h2>

            <p>{overview}</p>

            <h3>Genres</h3>
            <ul className={s.genresList}>
              {genres &&
                genres.map(({ id, name }) => (
                  <li key={id} className={s.genreItem}>
                    {name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
      <hr />
      <p>Additional information</p>
      <Link to={`${url}/cast`} className={s.castLink}>
        Cast
      </Link>
      <Link to={`${url}/reviews`} className={s.reviewsLink}>
        Reviews
      </Link>
      <hr />
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
