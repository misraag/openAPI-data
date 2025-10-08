import React from "react";
import "./Home.css";

function BreakNews({ news }) {
  return (
    <div style={{ marginBottom: "30px" , width: "95vw", margin:"auto", marginTop:"10px"}}>
      <h3 style={{color: "#555"}}>Breaking News...</h3>

      <div
        className="row gx-3 gy-3" 
      >
        {news
          .filter((item) => {
            if (!item.urlToImage) return false;
            const url = item.urlToImage.trim();
            if (url === "") return false;
            const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
            return imageExtensions.some((ext) =>
              url.toLowerCase().endsWith(ext)
            );
          })
          .slice(0, 12)
          .map((item, index) => (
            <div key={index} className="col-lg-2 col-md-3 col-6">
              <a
                href={item.url}
                target="_blank"
                style={{ textDecoration: "none" }} // removes underline
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "8px",
                    color: "#000",
                    overflow: "hidden",
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                    padding: 0,
                    cursor: "pointer",
                    transition: "transform 0.2s", // nice hover effect
                  }}
                  className="news-tile"
                >
                  <img
                    src={item.urlToImage}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "10px" }}>
                    <h6 style={{ height: "40px", overflow: "hidden" }}>
                      {item.title}
                    </h6>

                    <div
                      style={{
                        height: "70px",
                        overflow: "hidden",
                        fontSize: "12px",
                        color: "#555",
                        marginBottom: "5px",
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BreakNews;
