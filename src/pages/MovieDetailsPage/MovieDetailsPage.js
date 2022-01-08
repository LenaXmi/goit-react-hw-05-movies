import { useState, useEffect, lazy, Suspense } from "react";
import {
  useParams,
  useMatch,
  useNavigate,
  useLocation,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Loader from "react-loader-spinner";
import * as API from "../../services/movies-api";
import s from "./MovieDetailsPage.module.css";

const Cast = lazy(() => import("../Cast/Cast" /* webpackChunkName: 'cast' */));
const Reviews = lazy(() =>
  import("../Reviews/Reviews" /* webpackChunkName: 'reviews' */)
);

const MovieDetailsPage = () => {
  const { slug } = useParams();
  // const { url, path } = useMatch();
  // console.log(useMatch())
  const history = useNavigate();
  const location = useLocation();
  const [movieData, setMovieData] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const movieId = slug.match(/[a-z0-9]+$/)[0];

  const {
    poster_path,
    backdrop_path,
    title,
    release_date,
    vote_average,
    overview,
    genres,
  } = movieData;

  useEffect(() => {
    if (movieId === "") {
      return;
    }
    setStatus("pending");
    API.fetchMovieDetails(movieId)
      .then(setMovieData, setStatus("resolved"))
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      });
  }, [movieId]);

  return (
    <>
      {status === "pending" && (
        <Loader
          type="Circles"
          color="#2196f3"
          height={70}
          width={70}
          timeout={2000}
        />
      )}
      {status === "resolved" && (
        <>
          <button
            type="button"
            onClick={() => {
              history(location?.state?.from?.location ?? "/");
            }}
            className={s.goBackBtn}
          >
            {location?.state?.from?.label ?? "Go back"}
          </button>
          <div className={s.movieContainer}>
            <img
              className={s.poster}
              src={`https://image.tmdb.org/t/p/w342${
                poster_path ?? backdrop_path
              }`}
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
          <hr />
          <p>Additional information</p>
          <Link
            to={{
              pathname: `./cast`,
              state: { from: location?.state?.from ?? "/" },
            }}
            className={s.castLink}
          >
            Cast
          </Link>
          <Link
            to={{
              pathname: `./reviews`,
              state: { from: location?.state?.from ?? "/" },
            }}
            className={s.reviewsLink}
          >
            Reviews
          </Link>
          <hr />

          <Suspense
            fallback={
              <Loader
                type="ThreeDots"
                color="#2196f3"
                height={70}
                width={70}
                timeout={2000}
              />
            }
          >
            <Routes>
              <Route path="cast/*" element={<Cast movieId={movieId} />}></Route>
              <Route
                path="reviews/*"
                element={<Reviews movieId={movieId} />}
              ></Route>
            </Routes>
          </Suspense>
        </>
      )}

      {status === "rejected" && <h1>{error.message}</h1>}
    </>
  );
};

export default MovieDetailsPage;
