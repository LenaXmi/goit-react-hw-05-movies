import { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import * as API from "../../services/movies-api";

const MoviesPage = () => {
  const { url } = useRouteMatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchingMovies, setSearchingMovies] = useState(null);

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
    API.fetchMoviesByKeyword(searchQuery).then((response) =>
      setSearchingMovies(response.results)
    );
    setSearchQuery("");
  };
  console.log(searchingMovies);
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
