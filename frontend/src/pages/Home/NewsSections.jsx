import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import './Home.css'

function NewsSections({ category, news , darkMode}) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      style={{
        position: "relative",
        marginBottom: "30px",
        width: "92vw",
        margin: "auto",
        marginTop: "40px",
      }}
    >

      <h5>{category} News</h5>

      <button
        onClick={() => scroll("left")}
        style={{
          position: "absolute",
          top: "50%",
          left: "0",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "50%",
          width: "35px",
          height: "35px",
        }}
      >
        <ChevronLeft />
      </button>

      <div
        ref={scrollRef}
        className="thin-scroll"
        style={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: "10px",
          padding: "10px 0px",
        }}
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
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              key={index}
              style={{
                flex: "0 0 195px",
                background: "#fff",
                borderRadius: "8px",
                color: "#000",
                overflow: "hidden",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                textDecoration: "none",
              }}
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
              <div style={{ padding: "10px", backgroundColor: darkMode? "grey":"white", color: darkMode? "white":"black"}}>
                <h6 style={{ height: "40px", overflow: "hidden" }}>
                  {item.title}
                </h6>

                <div
                  style={{
                    height: "35px",
                    overflow: "hidden",
                    fontSize: "12px",
                    color: darkMode? "#c5babaff":"#555",
                    marginBottom: "5px",
                  }}
                >
                  {item.description}
                </div>
              </div>
            </a>
          ))}
      </div>

      <button
        onClick={() => scroll("right")}
        style={{
          position: "absolute",
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "50%",
          width: "35px",
          height: "35px",
        }}
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export default NewsSections;
