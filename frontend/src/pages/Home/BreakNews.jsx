import React from "react";
import { useState } from "react";
import axios from "axios";

function BreakNews({ news, darkMode }) {
  const [summaries, setSummaries] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const fetchSummary = async (article) => {
    try {
      setLoadingId(article.url);

      const res = await axios.post("http://localhost:5000/ai/summarize", {
        title: article.title,
        description: article.description,
        url: article.url,
      });

      setSummaries((prev) => ({
        ...prev,
        [article.url]: res.data.summary,
      }));
    } catch (err) {
      console.error("AI summary error", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div
      style={{
        marginBottom: "30px",
        width: "95vw",
        margin: "auto",
        marginTop: "30px",
      }}
    >
      <h3
        style={{
          color: darkMode ? "white" : "black",
          fontFamily: "'Marcellus', serif",
          fontWeight: "bolder",
          letterSpacing: "1px",
        }}
      >
        Headlines
      </h3>

      <div className="row gx-3 gy-3">
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
              <div
                onClick={() => window.open(item.url, "_blank")}
                target="_blank"
                style={{ textDecoration: "none" }}
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
                    transition: "transform 0.2s",
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
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: darkMode ? "#040404" : "white",
                      color: darkMode ? "white" : "black",
                    }}
                  >
                    <h6 style={{ height: "40px", overflow: "hidden" }}>
                      {item.title}
                    </h6>

                    <div
                      style={{
                        height: "70px",
                        overflow: "hidden",
                        fontSize: "12px",
                        color: darkMode ? "#c5babaff" : "#555",
                        marginBottom: "5px",
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchSummary(item);
                    }}
                    style={{
                      fontSize: "12px",
                      padding: "4px 6px",
                      marginTop: "6px",
                    }}
                    className="btn btn-outline-secondary"
                  >
                    ✨ AI Summary
                  </button>
                  {loadingId === item.url && (
                    <p style={{ fontSize: "12px", color: "#888" }}>
                      Generating summary...
                    </p>
                  )}
                  {summaries[item.url] && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        marginTop: "6px",
                        fontSize: "12px",
                        background: "#f8f9fa",
                        padding: "6px",
                        borderRadius: "4px",
                        maxHeight: "80px",
                        overflowY: "auto",
                      }}
                    >
                      {summaries[item.url]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BreakNews;
