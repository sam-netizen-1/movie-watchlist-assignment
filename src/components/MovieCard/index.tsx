import React, { useState, BaseSyntheticEvent } from "react";
import styles from "./MovieCard.module.scss";
import { IMovieDetails } from "../../redux/slice";

export interface Watchlist {
  name: string;
  movies: IMovieDetails[];
}

interface MovieCardProps {
  movie: IMovieDetails;
  watchlists: Watchlist[];
  onAddToWatchlist: (
    movie: IMovieDetails,
    watchlistName: string,
    e: BaseSyntheticEvent
  ) => void;
  onViewDetails: (imdbID: string, e: BaseSyntheticEvent) => void;
  handleModalToggle: (e: BaseSyntheticEvent, movie: IMovieDetails) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onViewDetails,
  handleModalToggle,
}) => {
  return (
    <div
      className={styles["movie-card"]}
      onClick={(e) => onViewDetails(movie.imdbID, e)}
    >
      <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <button onClick={(e) => handleModalToggle(e, movie)}>
        Add to Watchlist
      </button>
    </div>
  );
};

export default MovieCard;
