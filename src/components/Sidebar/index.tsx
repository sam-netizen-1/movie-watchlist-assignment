import { BaseSyntheticEvent, useState } from "react";
import styles from "./Sidebar.module.scss";
import MovieSearch from "../MovieSearch";
import {
  IMovieDetails,
  createWatchlist,
  logout,
  setCurrentView,
} from "../../redux/slice";
import { useStateValue } from "../../custom-hooks/useStateValue";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { state, dispatch } = useStateValue();
  const { currentUser, currentView } = state;
  const watchlists = state.users[currentUser!]?.watchlists || [];
  const [showModal, setShowModal] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const navigate = useNavigate();

  const handleSelect = (name: string) => {
    dispatch(setCurrentView(name));
    navigate("/watchlist");
  };

  const handleHomeClick = () => {
    dispatch(setCurrentView("home"));
    navigate("/");
  };
  const handleLogout = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
    dispatch(logout());
    navigate("/");
  };
  const handleCreateWatchlist = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (newWatchlistName.trim() !== "") {
      const isNameTaken = watchlists.find(
        (watchlist: { name: string; movies: IMovieDetails[] }) =>
          watchlist.name.toLowerCase() === newWatchlistName.toLowerCase()
      );
      if (!isNameTaken) {
        dispatch(createWatchlist({ name: newWatchlistName }));
        setNewWatchlistName("");
        setShowModal(false);
      } else {
        alert("Watchlist name already taken. Please choose another name.");
      }
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.name}> Watchlist App</div>
      <button
        onClick={handleHomeClick}
        className={`${styles.homeButton} ${
          currentView === "home" ? styles.selected : ""
        }`}
      >
        <img
          src="https://static.vecteezy.com/system/resources/previews/000/627/580/original/vector-home-icon-symbol-sign.jpg"
          className={styles.icon}
        />
        Home
      </button>
      <div className={styles.lists}>
        <h4>My Lists</h4>
        {watchlists.map(
          (watchlist: { name: string; movies: IMovieDetails[] }) => (
            <div
              key={watchlist.name}
              className={`${styles.listItem} ${
                currentView === watchlist.name ? styles.selected : ""
              }`}
              onClick={() => handleSelect(watchlist.name)}
            >
              <i className={`icon ${styles.icon}`} />
              {watchlist.name}
            </div>
          )
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
          className={styles.addButton}
        >
          Add New List
        </button>
      </div>
      <div className={styles.userProfile}>
        <img
          src={
            "https://icon-library.com/images/icon-profile/icon-profile-1.jpg"
          }
        />
        <span>{currentUser}</span>
      </div>
      <button className={styles.logout} onClick={handleLogout}>
        <img src={"https://cdn.onlinewebfonts.com/svg/img_356268.svg"} />
        Logout
      </button>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h4>Create New Watchlist</h4>
            <form onSubmit={handleCreateWatchlist}>
              <input
                type="text"
                value={newWatchlistName}
                onChange={(e) => setNewWatchlistName(e.target.value)}
                placeholder="Watchlist Name"
              />
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
