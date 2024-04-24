import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
}

export interface IMovieDetails {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface Watchlist {
  name: string;
  movies: IMovieDetails[];
}

interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  watchlists: Watchlist[];
}

export interface AppState {
  currentUser: string | null;
  users: { [email: string]: UserState };
  currentView: string;
}

const initialState: AppState = {
  currentUser: null,
  users: {},
  currentView: "home",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      const { email } = action.payload;
      state.currentUser = email;
      state.users[email] = state.users[email] || {
        isAuthenticated: true,
        user: action.payload,
        watchlists: [],
      };
      state.users[email].isAuthenticated = true;
    },
    logout(state) {
      if (state.currentUser) {
        state.users[state.currentUser].isAuthenticated = false;
        state.currentView = "home";
        state.currentUser = null;
      }
    },
    setCurrentView(state, action: PayloadAction<string>) {
      state.currentView = action.payload;
    },
    addToWatchlist(
      state,
      action: PayloadAction<{ movie: IMovieDetails; watchlistName: string }>
    ) {
      if (state.currentUser) {
        const userState = state.users[state.currentUser];
        const watchlist = userState.watchlists.find(
          (wl) => wl.name === action.payload.watchlistName
        );
        if (watchlist) {
          const movieExists = watchlist.movies.some(
            (movie) => movie.imdbID === action.payload.movie.imdbID
          );
          if (!movieExists) {
            watchlist.movies.push(action.payload.movie);
          }
        }
      }
    },

    removeFromWatchlist(
      state,
      action: PayloadAction<{ imdbID: string; watchlistName: string }>
    ) {
      if (state.currentUser) {
        const watchlist = state.users[state.currentUser].watchlists.find(
          (wl) => wl.name === action.payload.watchlistName
        );
        if (watchlist) {
          watchlist.movies = watchlist.movies.filter(
            (movie) => movie.imdbID !== action.payload.imdbID
          );
        }
      }
    },
    createWatchlist(state, action: PayloadAction<{ name: string }>) {
      if (
        state.currentUser &&
        !state.users[state.currentUser].watchlists.some(
          (wl) => wl.name === action.payload.name
        )
      ) {
        state.users[state.currentUser].watchlists.push({
          name: action.payload.name,
          movies: [],
        });
      }
    },
    renameWatchlist(
      state,
      action: PayloadAction<{ oldName: string; newName: string }>
    ) {
      if (state.currentUser) {
        const userState = state.users[state.currentUser];
        const watchlistIndex = userState.watchlists.findIndex(
          (wl) => wl.name === action.payload.oldName
        );
        if (watchlistIndex !== -1) {
          userState.watchlists[watchlistIndex].name = action.payload.newName;
          state.currentView = action.payload.newName;

        }
      }
    },
  },
});

export const {
  login,
  logout,
  setCurrentView,
  addToWatchlist,
  removeFromWatchlist,
  renameWatchlist,
  createWatchlist,
} = userSlice.actions;

export default userSlice.reducer;
