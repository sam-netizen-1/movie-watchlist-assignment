import React, { useState } from "react";
import {
  IMovieDetails,
  removeFromWatchlist,
  renameWatchlist,
} from "../../redux/slice";
import { useStateValue } from "../../custom-hooks/useStateValue";
import { useNavigate } from "react-router-dom";
import styles from "./Watchlist.module.scss";

function Watchlist() {
  const { state, dispatch } = useStateValue();
  const currentWatchlistName = state.currentView;
  const currentUser = state.currentUser;
  const watchlists = state.users[currentUser!]?.watchlists || [];
  const currentWatchlist = watchlists.find(
    (wl: any) => wl.name === currentWatchlistName
  );

  const [newWatchlistName, setNewWatchlistName] =
    useState(currentWatchlistName);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const handleRemoveFromWatchlist = (
    movie: IMovieDetails,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    dispatch(
      removeFromWatchlist({
        imdbID: movie.imdbID,
        watchlistName: currentWatchlistName,
      })
    );
  };

  const handleMovieClick = (imdbID: string) => {
    navigate(`/movies/${imdbID}`);
  };

  const handleRenameWatchlist = () => {
    if (newWatchlistName.trim() !== "") {
      dispatch(
        renameWatchlist({
          oldName: currentWatchlistName,
          newName: newWatchlistName,
        })
      );
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.watchlist}>
      <div className={styles.watchlistName}>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={newWatchlistName}
              onChange={(e) => setNewWatchlistName(e.target.value)}
            />
            <button className={styles.save} onClick={handleRenameWatchlist}>
              Save
            </button>
          </div>
        ) : (
          <h2>{currentWatchlistName}</h2>
        )}
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "" : "✎"}
        </button>
      </div>
      {currentWatchlist && currentWatchlist.movies.length > 0 ? (
        <div className={styles.movieGrid}>
          {currentWatchlist.movies.map((movie: IMovieDetails) => (
            <div
              key={movie.imdbID}
              className={styles.movieCard}
              onClick={() => handleMovieClick(movie.imdbID)}
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className={styles.moviePoster}
              />
              <div className={styles.movieInfo}>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <button
                  onClick={(e) => handleRemoveFromWatchlist(movie, e)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Watchlist selected is empty. Add movies to a watchlist!</p>
      )}
    </div>
  );
}

export default Watchlist;
