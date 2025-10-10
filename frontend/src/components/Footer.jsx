import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#121212",
        color: "#f1f1f1",
        padding: "15px 20px",
        marginTop: "50px",
        fontSize: "13px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1000px",
          margin: "auto",
        }}
      >

        <div style={{ flex: "1 1 200px" }}>
          <strong style={{ fontFamily: "'Marcellus', serif"}}>NewsHub</strong> — Stay updated with top news from India and worldwide.
        </div>


        <div style={{ flex: "1 1 200px", display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <Link style={{textDecoration:'none'}} to='/'>Top News</Link>
          <Link style={{textDecoration:'none'}} to='/Technology'>Technology</Link>
          <Link style={{textDecoration:'none'}} to='/Sports'>Sports</Link>
          <Link style={{textDecoration:'none'}} to='/World'>World</Link>
          <Link style={{textDecoration:'none'}} to='/Politics'>Politics</Link>
        </div>
      </div>

      <hr style={{ borderColor: "#333", margin: "10px 0" }} />

      <div style={{ textAlign: "center", color: "#aaa" }}>
        &copy; {new Date().getFullYear()} NewsHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
