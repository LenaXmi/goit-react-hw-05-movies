import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import NotFound from "./components/NotFound";

const HomePage = lazy(() =>
  import("./components/HomePage" /* webpackChunkName: 'home-page' */)
);
const MoviesPage = lazy(() =>
  import("./components/MoviesPage" /* webpackChunkName: 'movies-page' */)
);
const MovieDetailsPage = lazy(() =>
  import("./components/MovieDetailsPage" /* webpackChunkName: 'details-page' */)
);
// import "./App.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
