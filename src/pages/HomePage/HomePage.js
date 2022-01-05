import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from "../../services/movies-api";
import s from "./Homepage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    API.fetchPopularMovies()
      .then((response) => setMovies(response.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {movies && (
        <ul className={s.moviesList}>
          {movies.map(({ id, title, name }) => (
            <li key={id} className={s.listItem}>
              <Link to={`/movies/${id}`}>{title || name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
