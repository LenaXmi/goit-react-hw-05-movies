import { useState, useEffect } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import Loader from "react-loader-spinner";
import slugify from "slugify";
import * as API from "../../services/movies-api";
import s from "./Homepage.module.css";

const slug = (string) => slugify(string, { replacement: "_", lower: true });

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setStatus("pending");
    API.fetchPopularMovies()
      .then((response) => {
        setMovies(response.results);
        setStatus("resolved");
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      });
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
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
        <ul className={s.moviesList}>
          {movies.map(({ id, title, name }) => (
            <li key={id} className={s.listItem}>
              <Link
                to={{
                  pathname: `/movies/${slug(`${title}_${id}`)}`,
                  state: { from: { location, label: "Go back to homepage" } },
                }}
              >
                {title ?? name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {status === "rejected" && <h1>{error.message}</h1>}
    </div>
  );
};

export default HomePage;
