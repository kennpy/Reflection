import "./App.css";
import React, { useEffect, useState } from "react";
import TemplateForm from "./components/TemplateForm";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReflectionArea from "./components/ReflectionArea";
import UserContext from "./context/UserContext";

function App() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    console.log("userAnswers was set to ", userAnswers);
  }, [userAnswers]);

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
        <ReflectionArea
          setUserAnswers={setUserAnswers}
          userAnswers={userAnswers}
        />
        <TemplateForm userId={userId} />
        <Login setUserId={setUserId} setUserName={setUserName} />
        <Register />
      </UserContext.Provider>
    </div>
  );
}

export default App;
