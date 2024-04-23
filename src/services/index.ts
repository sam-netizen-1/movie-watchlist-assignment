const API_URL = "https://www.omdbapi.com/";
const API_KEY = "5fc82d36";

export const fetchMovieByImdbID = async (imdbID: string) => {
  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${imdbID}`);
    const data = await response.json();
    if (response.ok && data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error || "Movie not found");
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchMoviesBySearchQuery = async (query: string) => {
  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();
    if (response.ok && data.Response === "True") {
      return data.Search || [];
    } else {
      throw new Error(data.Error || "Movies not found");
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
