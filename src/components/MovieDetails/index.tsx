import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./MovieDetails.module.scss";
import { fetchMovieByImdbID } from "../../services";

interface IMovieDetails {
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  Plot: string;
  Genre: string;
  Director: string;
  Actors: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
}

const MovieDetails: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (imdbID) {
      const fetchMovie = async () => {
        try {
          const movieDetails = await fetchMovieByImdbID(imdbID);
          setMovie(movieDetails);
        } catch (error) {
          console.error("Failed to fetch movie details", error);
          setMovie(null);
        }
      };

      fetchMovie();
    } else {
      setMovie(null);
    }
  }, [imdbID]);
  const handleBackClick = () => {
    navigate(-1);
  };
  const renderRatings = (ratings: { Source: string; Value: string }[]) => {
    return ratings.map((rating, index) => (
      <p key={index}>
        <strong>{rating.Source}:</strong> {rating.Value}
      </p>
    ));
  };

  return (
    <div className={styles.movieDetails}>
      <button onClick={handleBackClick} className={styles.backButton}>
        Back
      </button>
      {movie ? (
        <div>
          <h2>{movie.Title}</h2>
          <img src={movie.Poster} alt={`The movie titled: ${movie.Title}`} />
          <p>
            <strong>Year:</strong> {movie.Year}
          </p>
          <p>
            <strong>Type:</strong> {movie.Type}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <h3>Ratings:</h3>
          <div className={styles.ratings}>{renderRatings(movie.Ratings)}</div>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Language:</strong> {movie.Language}
          </p>
          <p>
            <strong>Country:</strong> {movie.Country}
          </p>
          <p>
            <strong>Awards:</strong> {movie.Awards}
          </p>
          <p>
            <strong>Metascore:</strong> {movie.Metascore}
          </p>
          <p>
            <strong>IMDB Rating:</strong> {movie.imdbRating}
          </p>
          <p>
            <strong>IMDB Votes:</strong> {movie.imdbVotes}
          </p>
        </div>
      ) : (
        <p>Movie details not found.</p>
      )}
    </div>
  );
};

export default MovieDetails;
