import { useState, useEffect } from "react";
import { useParams, useRouteMatch, Route, Link } from "react-router-dom";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import * as API from "../../services/movies-api";
import s from "./MovieDetailsPage.module.css";

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
            src={`https://image.tmdb.org/t/p/w342${
              movieData.poster_path || movieData.backdrop_path
            }`}
            alt="poster"
          />
        </>
      )}
      <hr />

      <Route path={path}>
        <div>
          <Cast movieId={movieId} />
          <Reviews movieId={movieId} />
        </div>
      </Route>
    </>
  );
};

export default MovieDetailsPage;
