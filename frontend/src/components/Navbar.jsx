import React from "react";
import { Link } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { AiFillSun } from "react-icons/ai";
import { LuReceiptIndianRupee } from "react-icons/lu";

function Navbar({ darkMode, setDarkMode }) {
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu & Kashmir",
    "Ladakh",
    "Puducherry",
    "Chandigarh",
  ];

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "World", link: "/World" },
    { name: "National", link: "/National" },
    { name: "Politics", link: "/Politics" },
    { name: "Sports", link: "/Sports" },
    { name: "Technology", link: "/Technology" },
    { name: "Entertainment", link: "/Entertainment" },
  ];

  const closeOffcanvas = () => {
    const el = document.getElementById("mobileNav");
    if (!el) return;
    const offcanvas = window.bootstrap.Offcanvas.getInstance(el);
    if (offcanvas) {
      offcanvas.hide();
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: "#165bc1",
        marginBottom: "25px",
        fontFamily: "'Marcellus', serif",
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          style={{ fontWeight: "bold", letterSpacing: "1px" }}
        >
          <LuReceiptIndianRupee
            style={{ fontSize: "27px", marginRight: "6px" }}
          />
          WhatsNew
        </Link>

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-none d-lg-flex">
          <ul className="navbar-nav me-auto">
            {menuItems.map((m, i) => (
              <li className="nav-item" key={i}>
                <Link className="nav-link" to={m.link}>
                  {m.name}
                </Link>
              </li>
            ))}

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                States
              </a>
              <ul
                className="dropdown-menu"
                style={{ maxHeight: "30vh", overflowY: "auto" }}
              >
                {states.map((s, i) => (
                  <li key={i}>
                    <Link
                      className="dropdown-item"
                      to={`/${encodeURIComponent(s)}`}
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <div className="text-white ms-3">
            <i
              onClick={() => setDarkMode(!darkMode)}
              style={{ cursor: "pointer", fontSize: "25px" }}
            >
              {darkMode ? (
                <MdDarkMode />
              ) : (
                <AiFillSun style={{ color: "yellow" }} />
              )}
            </i>
          </div>
        </div>

        <div
          className="offcanvas offcanvas-start text-bg-primary d-lg-none"
          id="mobileNav"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">WhatsNew</h5>
            <button
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav">
              {menuItems.map((m, i) => (
                <li key={i} className="nav-item">
                  <Link
                    style={{ color: "white" }}
                    className="nav-link"
                    to={m.link}
                    onClick={() => {
                      closeOffcanvas();
                    }}
                  >
                    {m.name}
                  </Link>
                </li>
              ))}

              <li className="nav-item">
                <span
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="collapse"
                  data-bs-target="#mobileStates"
                  style={{ cursor: "pointer" , color:"white"}}
                >
                  States
                </span>

                <ul
                  className="collapse list-unstyled ps-3"
                  id="mobileStates"
                  style={{ maxHeight: "40vh", overflowY: "auto"}}
                >
                  {states.map((s, i) => (
                    <li key={i}>
                      <Link
                        style={{ color: "white" }}
                        className="nav-link"
                        to={`/${encodeURIComponent(s)}`}
                        onClick={closeOffcanvas}
                      >
                        {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <div className="text-white mt-3">
              <i
                onClick={() => {
                  setDarkMode(!darkMode);
                  closeOffcanvas();
                }}
                style={{ cursor: "pointer", fontSize: "25px" }}
              >
                {darkMode ? (
                  <MdDarkMode />
                ) : (
                  <AiFillSun style={{ color: "yellow" }} />
                )}
              </i>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
