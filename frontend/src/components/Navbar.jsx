import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        
        <a className="navbar-brand" href="#">NewsHub</a>

        
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
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">World</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Politics</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Sports</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Technology</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Entertainment</a>
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
              onChange={() => {
                
                alert('Dark mode toggled (implement logic)');
              }}
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
