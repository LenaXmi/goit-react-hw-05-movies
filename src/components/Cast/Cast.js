import { useRouteMatch, Link, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import * as API from "../../services/movies-api";

const Cast = ({ movieId }) => {
  const { url, path } = useRouteMatch();

  const [cast, setCast] = useState(null);

  useEffect(() => {
    API.fetchMovieCredits(movieId).then((response) => setCast(response.cast));
  }, [movieId]);

  return (
    <>
      <Link to={`${url}/cast`}>
        {" "}
        <h2>Cast</h2>
      </Link>
      <Route path={`${path}/cast`}>
        {cast && (
          <ul>
            {cast.map((actor) => (
              <li key={actor.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w342${actor.profile_path}`}
                  alt=""
                />
                <p>Name: {actor.name}</p>
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
