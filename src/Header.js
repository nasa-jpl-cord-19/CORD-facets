import React from "react";

function Header() {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbarLinks"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="#!/">
            Polar Deep Insights
          </a>
        </div>

        <div
          className="collapse navbar-collapse navbar-collapse"
          id="navbarLinks"
        >
          <ul className="nav navbar-nav" />

          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/#!/concept_editor">Concept Editor</a>
            </li>
            <li>
              <a href="/#!/query">Query Interface</a>
            </li>
            <li>
              <a href="/#!/config">Configure</a>
            </li>
            <li class="active">
              <a href="/facetview">Facet View</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
