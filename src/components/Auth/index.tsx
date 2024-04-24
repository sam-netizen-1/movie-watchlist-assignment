import React, { useState, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../redux/slice";
import { useStateValue } from "../../custom-hooks/useStateValue";
import styles from "./Authentication.module.scss";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const { dispatch } = useStateValue();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email) {
      dispatch(login({ email }));
      navigate(from, { replace: true });
    } else {
      console.error("Email is empty");
    }
  };

  return (
    <div className={styles.authentication}>
      {" "}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Authentication;
