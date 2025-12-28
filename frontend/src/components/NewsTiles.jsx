import React, { useState } from "react";
import Loading from "./Loading";
import Modal from "./Modal/Modal";

function NewsTiles({ category, news, loading, darkMode }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  return (
    <div>
      {loading ? (
        <Loading state={category} />
      ) : (
        <div
          style={{
            marginBottom: "30px",
            width: "95vw",
            margin: "auto",
            marginTop: "10px",
          }}
        >
          <h3
            style={{
              color: darkMode ? "white" : "black",
              fontFamily: "'Marcellus', serif",
              fontWeight: "bolder",
            }}
          >
            {category} News
          </h3>

          <div className="row gx-3 gy-3">
            {news
              .filter((item) => {
                if (!item.urlToImage) return false;
                const url = item.urlToImage.trim();
                if (url === "") return false;
                const imageExtensions = [
                  ".jpg",
                  ".jpeg",
                  ".png",
                  ".gif",
                  ".webp",
                ];
                return imageExtensions.some((ext) =>
                  url.toLowerCase().endsWith(ext)
                );
              })
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedArticle(item);
                          }}
                          className="btn btn-outline-secondary"
                          style={{
                            fontSize: "9px",
                            padding: "4px 6px",
                            margin: "5px",
                          }}
                        >
                          ✨ AI Summary
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {selectedArticle && (
              <Modal
                item={selectedArticle}
                darkMode={darkMode}
                onClose={() => setSelectedArticle(null)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsTiles;
