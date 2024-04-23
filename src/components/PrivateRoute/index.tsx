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

  return isAuthenticated ? (
    <div className={styles["private-layout"]}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
