const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "api_key=c7621ec1ac51af5979157e38aa5549e0";

export async function fetchPopularMovies() {
  const url = `${BASE_URL}/trending/all/day?${API_KEY}`;
  const response = await fetch(url);

  return response.ok
    ? await response.json()
    : Promise.reject(new Error(`There is no movies`));
}

export async function fetchMoviesByKeyword(searchQuery) {
  const url = `
${BASE_URL}search/movie?${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error(`There is no movies`));
}

export async function fetchMovieDetails(movieId) {
  const url = `
${BASE_URL}movie/${movieId}?${API_KEY}&language=en-US`;
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error(`There is no movie data`));
}

export async function fetchMovieCredits(movieId) {
  const url = `
${BASE_URL}movie/${movieId}/credits?${API_KEY}&language=en-US`;
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error(`There is no data`));
}

export async function fetchMovieReviews(movieId) {
  const url = `
${BASE_URL}movie/${movieId}/reviews?${API_KEY}&language=en-US`;
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error(`There is no reviews for this movie`));
}
