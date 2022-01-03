import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from "../../services/movies-api";

const HomePage = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    API.fetchPopularMovies().then((response) => setMovies(response.results));
  }, []);

  return (
    <div>
      {movies && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
