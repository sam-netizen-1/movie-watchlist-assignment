import React, { useState } from "react";
import useDebounce from "../../custom-hooks/useDebounce";
import styles from "./MovieSearch.module.scss";
interface MovieSearchProps {
  onSearch: (searchTerm: string) => void;
  query: string;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onSearch, query }) => {
  const [searchTerm, setSearchTerm] = useState(query);

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
