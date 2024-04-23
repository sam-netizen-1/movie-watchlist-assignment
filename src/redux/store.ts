import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice";
import { loadState, saveState } from "./localstorageSync";

const persistedState = loadState();

const reducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: reducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});

export default store;
