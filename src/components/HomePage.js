import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to reflect!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/template">Reflect</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
