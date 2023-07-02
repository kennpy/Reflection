import React, { useEffect, useState } from "react";
const { PORT } = require("../backendConfig");
const FETCH_LOGIN_PATH = `http://localhost:${PORT}/users/login`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorExists, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  function checkFormIsFilled() {
    let formIsFilled = true;
    if (username === "") {
      setLoginErrorMessage("Username cannot be empty");
      formIsFilled = false;
    } else if (password === "") {
      setLoginErrorMessage("Password cannot be empty");
      formIsFilled = false;
    }
    return formIsFilled;
  }

  async function handleLogin(evt) {
    evt.preventDefault();
    const formIsFilled = checkFormIsFilled();
    if (formIsFilled) {
      // validate sign in info on backend and sign them in
      fetch(FETCH_LOGIN_PATH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((res) => res.json())
        .then((loginDetails) => {
          console.log("login response : ", loginDetails);
        });
      //else show invalid credentials
    }
  }

  return (
    <div className="login-page">
      <h2>LOGIN</h2>
      <form>
        <div>
          <label for="username">Username</label>
          <input
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            type="text"
            autocomplete="username"
            required
          />
        </div>
        <div>
          <label for="current-password">Password</label>
          <input
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            id="current-password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
          />
        </div>
        <div>
          <button type="submit" onClick={handleLogin}>
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
