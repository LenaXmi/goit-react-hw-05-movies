import { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import * as API from "../../services/movies-api";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const queryParams = new URLSearchParams(location.search).get("query");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchingMovies, setSearchingMovies] = useState([]);

  useEffect(() => {
    if (queryParams === null) {
      return;
    }

    API.fetchMoviesByKeyword(queryParams)
      .then((response) => setSearchingMovies(response.results))
      .catch((error) => console.log(error));
  }, [queryParams]);

  const handleChange = (e) => {
    const { value } = e.currentTarget;
    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      return;
    }
    setSearchQuery(searchQuery);

    history.push({ ...location, search: `query=${searchQuery}` });
    setSearchQuery("");
  };

  return (
    <>
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
      {searchingMovies && (
        <ul className={s.moviesList}>
          {searchingMovies.map(({ id, original_title }) => (
            <li key={id} className={s.listItem}>
              <Link to={`${url}/${id}`}>{original_title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MoviesPage;
