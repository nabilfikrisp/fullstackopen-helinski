import React, { useEffect, useState } from "react";
import authService from "../../services/auth";
import blogService from "../../services/blogs";
import Alert from "../Alert";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [myAlert, setMyAlert] = useState({
    message: "",
    type: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await authService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      setMyAlert({ message: "login success", type: "success" });
    } catch (error) {
      setMyAlert({ message: `login failed`, type: "error" });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMyAlert({ message: "", type: "" });
    }, 7000);
  }, [myAlert]);

  return (
    <div style={{ width: "25vw" }}>
      {myAlert?.message !== "" && (
        <Alert type={myAlert?.type}>{myAlert?.message}</Alert>
      )}
      <h2>Login</h2>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
