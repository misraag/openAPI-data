// components/ExploreButton.jsx
import React from "react";
import { Link } from "react-router-dom";

function ExploreButton({to, darkMode }) {
  return (
    <Link
      to={to}
      style={{
        display: "inline-block",
        padding:'4px',
        

        borderRadius: "4px",
        textDecoration: "none",
        fontSize: "0.75rem",
        lineHeight: "1",
        fontWeight: "700",
        color: darkMode ? "white" : "#a39999ff",
        
        margin: "0",
        transition: "background-color 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {`>>`}
    </Link>
  );
}

export default ExploreButton;
