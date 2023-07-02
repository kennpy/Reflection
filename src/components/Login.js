import React, { useEffect, useState } from "react";
const { PORT } = require("../backendConfig");
const FETCH_LOGIN_PATH = `http://localhost:${PORT}/users`;

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

  async function handleLogin() {
    const formIsFilled = checkFormIsFilled();
    if (formIsFilled) {
      console.log("Loggin in ", username, password);
      // validate sign in info on backend and sign them in
      const response = await fetch(FETCH_LOGIN_PATH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      console.log(response.json());
      //else show invalid credentials
    }
  }

  return (
    <div>
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {loginErrorExists && <p>{loginErrorMessage}</p>}

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
