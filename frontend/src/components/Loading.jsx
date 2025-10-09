import React from "react";

function Loading({ state }) {
  return (
    <div style={{ width: "95vw", margin: "auto", marginTop: "10px" }}>
      <h3 style={{ color: "#999", textAlign: "center", marginTop: "50px" }}>
        Loading {state} News...
      </h3>
    </div>
  );
}

export default Loading;
