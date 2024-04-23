import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import MovieList from "./components/MovieList";
import Watchlist from "./components/WatchList";
import Authentication from "./components/Auth";
import "./App.scss";
import MovieDetails from "./components/MovieDetails";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Authentication />} />
        <Route element={<PrivateRoute />}>
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/" element={<MovieList />} />
          <Route path="/movies/:imdbID" element={<MovieDetails />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
