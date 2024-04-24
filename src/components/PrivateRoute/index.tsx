import React, { useState } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import styles from "./PrivateRoute.module.scss";
import { useStateValue } from "../../custom-hooks/useStateValue";

const PrivateRoute = () => {
  const { state } = useStateValue();
  const location = useLocation();

  const currentUserEmail = state.currentUser;
  const isAuthenticated = currentUserEmail
    ? state.users[currentUserEmail].isAuthenticated
    : false;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return isAuthenticated ? (
    <div className={styles["private-layout"]}>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <Sidebar />
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          {isSidebarOpen ? "<" : ">"}
        </button>
      </div>
      <div className={styles["content"]}>
        <div
          className={`${styles.contentInner} ${
            isSidebarOpen ? styles.withSidebar : ""
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
