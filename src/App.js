import "./App.css";
import React, { useState } from "react";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import ReflectionArea from "./components/ReflectionArea";
import UserContext from "./context/UserContext";

function App() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  return (
    <div class="main-page">
      {/* {" "}
      <Router>
        {" "}
        <Routes>
           <Route exact path="/" element={<HomePage />} />
           <Route path="/login" lement={<Login />} />
           <Route path="/template" clement={<ReflectionArea />} />
          {" "}
        </Routes>
      </Router>
              {" "} */}
      <UserContext.Provider value={userId}>
        <SideBar answers={userAnswers} />
        <ReflectionArea setUserAnswers={setUserAnswers} />
        <Login setUserId={setUserId} setUserName={setUserName} />
        <Register />
      </UserContext.Provider>
    </div>
  );
}

export default App;
