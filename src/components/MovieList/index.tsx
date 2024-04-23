import React, { useState, useEffect, BaseSyntheticEvent } from "react";
import MovieSearch from "../MovieSearch";
import MovieCard, { Watchlist } from "../MovieCard";
import { useNavigate } from "react-router-dom";
import styles from "./MovieList.module.scss";
import { IMovieDetails, addToWatchlist } from "../../redux/slice";
import { useStateValue } from "../../custom-hooks/useStateValue";
import { fetchMoviesBySearchQuery } from "../../services";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<IMovieDetails[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<IMovieDetails>();
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const { state, dispatch } = useStateValue();
  const navigate = useNavigate();
  const watchlists = state.users[state.currentUser!]?.watchlists || [];

  const handleModalToggle = (e: BaseSyntheticEvent, movie: IMovieDetails) => {
    e.stopPropagation();
    setShowModal((prevState) => !prevState);
    setSelectedMovie(movie);
  };

  useEffect(() => {
    if (query.trim() !== "") {
      const fetchMovies = async () => {
        try {
          const movies = await fetchMoviesBySearchQuery(query);
          setMovies(movies);
        } catch (error) {
          console.error("Failed to fetch movies", error);
          setMovies([]);
        }
      };
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  const onAddToWatchlist = (
    movie: IMovieDetails,
    watchlistName: string,
    e: BaseSyntheticEvent
  ) => {
    e.stopPropagation();
    dispatch(addToWatchlist({ movie: movie, watchlistName }));
  };

  const viewDetails = (imdbID: string, e: BaseSyntheticEvent) => {
    e.stopPropagation();
    navigate(`/movies/${imdbID}`);
  };

  const isMovieInWatchlist = (watchlist: Watchlist) => {
    return watchlist.movies?.find(
      (watchlistMovie) => watchlistMovie.imdbID === selectedMovie?.imdbID
    );
  };

  const handleModalClose = () => {
    setSelectedMovie(undefined);
    setShowModal(false);
  };

  return (
    <div>
      <h2>Movie List</h2>
      <MovieSearch onSearch={setQuery} />
      <div className={styles["movie-list"]}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            watchlists={watchlists}
            onAddToWatchlist={onAddToWatchlist}
            onViewDetails={viewDetails}
            handleModalToggle={handleModalToggle}
          />
        ))}
      </div>
      {showModal && (
        <div
          className={styles.modal}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={handleModalClose}>
              &times;
            </span>
            <h4>Select Watchlist:</h4>
            {watchlists.map((watchlist: Watchlist) => (
              <button
                key={watchlist.name}
                onClick={(e) => {
                  onAddToWatchlist(selectedMovie!, watchlist.name, e);
                  handleModalClose();
                }}
                disabled={!!isMovieInWatchlist(watchlist)}
              >
                {watchlist.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
