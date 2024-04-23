import React, { useState } from "react";
import useDebounce from "../../custom-hooks/useDebounce";
import styles from "./MovieSearch.module.scss";
interface MovieSearchProps {
  onSearch: (searchTerm: string) => void;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useDebounce(searchTerm, onSearch, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles["movie-search"]}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleChange}
          required
        />
      </form>
    </div>
  );
};
export default MovieSearch;
