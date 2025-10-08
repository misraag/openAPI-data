import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NewsHub</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/WorldNews">World</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Politics">Politics</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Sports">Sports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Technology">Technology</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Entertainment">Entertainment</Link>
            </li>
          </ul>

          <form className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search news"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>

          <div className="form-check form-switch text-white">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              onChange={() => alert('Dark mode toggled (implement logic)')}
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              Dark Mode
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
