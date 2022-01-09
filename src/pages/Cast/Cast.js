import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import * as API from "../../services/movies-api";
import s from "./Cast.module.css";
import icon from "../../icons/icon.png";

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (movieId) {
      setStatus("pending");
      API.fetchMovieCredits(movieId)
        .then((response) => setCast(response.cast), setStatus("resolved"))
        .catch((error) => setError(error));
    }
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
      {status === "resolved" && cast && (
        <ul>
          {cast.map(({ id, profile_path, name, character }) => (
            <li key={id}>
              <img
                className={s.actorPhoto}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w342${profile_path}`
                    : icon
                }
                alt="actor"
              />
              <p> {name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
      {status === "resolved" && cast.length === 0 && (
        <p>There is no cast for this movie</p>
      )}
      {status === "rejected" && <h1>{error && error.message} </h1>}
    </>
  );
};

export default Cast;
