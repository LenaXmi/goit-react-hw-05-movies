import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loader from "react-loader-spinner";
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
      <Suspense
        fallback={
          <Loader
            type="ThreeDots"
            color="#2196f3"
            height={70}
            width={70}
            timeout={2000}
          />
        }
      >
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/movies/:slug">
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
