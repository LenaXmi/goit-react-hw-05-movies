import { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import * as API from "../../services/movies-api";

const MoviesPage = () => {
  const history = useHistory();
  const location = useLocation();

  const { url } = useRouteMatch();
  const queryParams = new URLSearchParams(location.search).get("query");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchingMovies, setSearchingMovies] = useState(null);

  useEffect(() => {
    if (queryParams === null) {
      return;
    }

    API.fetchMoviesByKeyword(queryParams).then((response) =>
      setSearchingMovies(response.results)
    );
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
        <button type="submit">find</button>
      </form>
      {searchingMovies && (
        <ul>
          {searchingMovies.map((movie) => (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`}>{movie.original_title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MoviesPage;
