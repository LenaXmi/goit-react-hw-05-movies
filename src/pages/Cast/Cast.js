import { useRouteMatch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import * as API from "../../services/movies-api";
import s from "./Cast.module.css";
import icon from "../../icons/icon.png";

const Cast = ({ movieId }) => {
  const { path } = useRouteMatch();

  const [cast, setCast] = useState(null);

  useEffect(() => {
    API.fetchMovieCredits(movieId)
      .then((response) => setCast(response.cast))
      .catch((error) => console.log(error));
  }, [movieId]);

  return (
    <>
      <Route path={`${path}/cast`}>
        {cast && (
          <ul>
            {cast.map((actor) => (
              <li key={actor.id}>
                <img
                  className={s.actorPhoto}
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w342${actor.profile_path}`
                      : icon
                  }
                  alt="actor"
                />
                <p> {actor.name}</p>
                <p>Character: {actor.character}</p>
              </li>
            ))}
          </ul>
        )}
      </Route>
    </>
  );
};

export default Cast;

// {/* <ul>
//         {actors.map(actor => (<li key={actor.id}>
//             <img src={`https://image.tmdb.org/t/p/w342${actor.profile_path}`} alt='' />
//             <p>Name: { actor.name}</p>
//             <p>Character: { actor.character}</p>

//         </li>))}
//     </ul> */}
