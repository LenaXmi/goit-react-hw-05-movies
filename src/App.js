import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Container from "./components/Container";
import Navigation from "./components/Navigation";
import NotFound from "./components/NotFound";

const HomePage = lazy(() =>
  import("./pages/HomePage" /* webpackChunkName: 'home-page' */)
);
const MoviesPage = lazy(() =>
  import("./pages/MoviesPage" /* webpackChunkName: 'movies-page' */)
);
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage" /* webpackChunkName: 'details-page' */)
);

function App() {
  return (
    <Container>
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
    </Container>
  );
}

export default App;
