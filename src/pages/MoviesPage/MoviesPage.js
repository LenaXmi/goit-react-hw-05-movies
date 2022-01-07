import { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as API from "../../services/movies-api";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const queryParams = new URLSearchParams(location.search).get("query");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchingMovies, setSearchingMovies] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  console.log(location);
  useEffect(() => {
    if (queryParams === null) {
      return;
    }
    setStatus("pending");

    API.fetchMoviesByKeyword(queryParams)
      .then((response) => {
        if (response.results.length !== 0) {
          setSearchingMovies(response.results);
          setStatus("resolved");
        } else {
          toast.error("No movies found");
          setStatus("idle");
        }
      })
      .catch((error) => setError(error), setStatus("rejected"));
  }, [queryParams]);

  const handleChange = (e) => {
    const { value } = e.currentTarget;
    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      toast.info("The input field cannot be empty");
      return;
    }
    setSearchQuery(searchQuery);

    history.push({ ...location, search: `query=${searchQuery}` });
    setSearchQuery("");
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
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
          {searchingMovies.map(({ id, original_title }) => (
            <li key={id} className={s.listItem}>
              <Link
                to={{
                  pathname: `${url}/${id}`,
                  state: {
                    from: { location, label: "Go back to search page" },
                  },
                }}
              >
                {original_title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MoviesPage;
