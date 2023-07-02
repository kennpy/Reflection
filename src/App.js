import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import ReflectionArea from "./components/ReflectionArea";

function App() {
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

      <SideBar />
      <ReflectionArea />
      <Login />
    </div>
  );
}

export default App;
