import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
       <a className="navbar-brand" href="#!/">
            COVID-19 Open Research Dataset Insights
          </a>
      </div>
    </nav>
  );
}

export default Header;
