import React, { useState } from "react";
import AIButton from "./AIButton";
import Modal from "./Modal/Modal";
import Loading from "./Loading";


function TileList({ title, news, darkMode, limit, loading }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredNews = news
    .filter(item => item.urlToImage && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.urlToImage.trim()))
    .slice(0, limit ?? news.length);

  if (loading) return <Loading state={title} />;

  return (
    <div style={{ marginBottom: "30px", width: "95vw", margin: "auto", marginTop: "20px" }}>
      <h3 style={{ color: darkMode ? "white" : "black", fontFamily: "'Marcellus', serif", fontWeight: "bolder" }}>
        {title}
      </h3>

      <div className="row gx-3 gy-3">
        {filteredNews.map((item, index) => (
          <div key={index} className="col-lg-2 col-md-3 col-6">
            <div onClick={() => window.open(item.url, "_blank")} style={{ cursor: "pointer" }}>
              <div
                className="news-tile"
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  background: darkMode ? "black" : "white",
                  color: darkMode ? "white" : "black",
                }}
              >
                <img
                  src={item.urlToImage}
                  style={{ width: "100%", height: "140px", objectFit: "cover" }}
                />

                <div style={{ padding: "10px" }}>
                  <h6 style={{ height: "40px", overflow: "hidden" }}>{item.title}</h6>

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

                <AIButton
                 darkMode={darkMode} onClick={() => setSelectedArticle(item)} />
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
  );
}

export default TileList;
