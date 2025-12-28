import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Modal({ item, onClose, darkMode }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);


  const [activeArticle, setActiveArticle] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!item) return;

    const openSummaryModal = async () => {
      setActiveArticle(item);
      setLoading(true);
      setSummary("");

      try {
        const res = await axios.post("http://localhost:5000/ai/summarize", {
          title: item.title,
          description: item.description,
          url: item.url,
        });

        setSummary(res.data.summary);
      } catch (err) {
        setSummary("Failed to generate summary.");
        console.log("Error ", err);
      } finally {
        setLoading(false);
      }
    };
    openSummaryModal();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(255, 254, 254, 0.1)",
        backdropFilter: "blur(4px)",
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Backdrop click layer */}
      <div
        onClick={() => onClose()}
        style={{
          position: "absolute",
          inset: 0,
        }}
      />

      {/* Modal box */}
      <div
        style={{
          position: "relative",
          width: "600px",
          maxWidth: "90%",
          background: darkMode ? "#0b0b0b" : "#ffffff",
          color: darkMode ? "#ffffff" : "#000000",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          zIndex: 1,
        }}
        // onClick={() => e.stopPropagation()} // solid isolation
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

          {/* ❌ Close button */}
          <button
            onClick={()=> onClose()}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "22px",
              cursor: "pointer",
              pointerEvents: "auto",
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
          <h5 style={{ marginBottom: "10px" }}>{activeArticle?.title}</h5>

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
            // onClick={(e) => e.stopPropagation()}
            className="btn btn-primary btn-sm"
          >
            Read Full Article
          </a>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onClose()}
            style={{ pointerEvents: "auto" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
