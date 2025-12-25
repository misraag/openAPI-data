import React from "react";
import { useState } from "react";
import axios from "axios";

function BreakNews({ news, darkMode }) {
  const [showModal, setShowModal] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const openSummaryModal = async (article) => {
    setActiveArticle(article);
    setShowModal(true);
    setLoading(true);
    setSummary("");

    try {
      const res = await axios.post("http://localhost:5000/ai/summarize", {
        title: article.title,
        description: article.description,
        url: article.url,
      });

      setSummary(res.data.summary);
    } catch (err) {
      setSummary("Failed to generate summary.");
      console.log("Error ", err);
    } finally {
      setLoading(false);
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
                      openSummaryModal(item);
                    }}
                    className="btn btn-outline-secondary"
                    style={{ fontSize: "12px", padding: "4px 6px" }}
                  >
                    ✨ AI Summary
                  </button>

                  {showModal && (
                    <div
                      style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(245, 245, 245, 0.1)", // translucent
                        backdropFilter: "blur(4px)", // premium blur
                        zIndex: 1050,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => setShowModal(false)} // click outside closes modal
                    >
                      <div
                        style={{
                          width: "600px",
                          maxWidth: "90%",
                          background: darkMode ? "#0b0b0b" : "#ffffff",
                          color: darkMode ? "#ffffff" : "#000000",
                          borderRadius: "10px",
                          overflow: "hidden",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                        }}
                        onClick={(e) => e.stopPropagation()} // prevent close on inner click
                      >
                        {/* Header */}
                        <div
                          style={{
                            padding: "12px 16px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          <h6 style={{ margin: 0 }}>AI Summary Using Groq</h6>
                          <button
                            onClick={() => setShowModal(false)}
                            style={{
                              background: "transparent",
                              border: "none",
                              fontSize: "20px",
                              cursor: "pointer",
                              color: darkMode ? "white" : "black",
                            }}
                          >
                            ×
                          </button>
                        </div>

                        {/* Image */}
                        {activeArticle?.urlToImage && (
                          <img
                            src={activeArticle.urlToImage}
                            alt="Article"
                            style={{
                              width: "100%",
                              height: "220px",
                              objectFit: "cover",
                            }}
                          />
                        )}

                        {/* Content */}
                        <div style={{ padding: "16px" }}>
                          <h5 style={{ marginBottom: "10px" }}>
                            {activeArticle?.title}
                          </h5>

                          {loading ? (
                            <p style={{ fontSize: "14px", opacity: 0.7 }}>
                              Generating AI summary...
                            </p>
                          ) : (
                            <p
                              style={{
                                fontSize: "14px",
                                lineHeight: "1.6",
                                opacity: 0.9,
                              }}
                            >
                              {summary}
                            </p>
                          )}
                        </div>

                        {/* Footer */}
                        <div
                          style={{
                            padding: "12px 16px",
                            display: "flex",
                            justifyContent: "space-between",
                            borderTop: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          <a
                            href={activeArticle?.url}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="btn btn-primary btn-sm"
                          >
                            Read Full Article
                          </a>

                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
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
