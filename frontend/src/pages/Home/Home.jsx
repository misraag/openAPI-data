import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import './Home.css'

function Home() {
  let [breakingNews, setBreakingNews] = useState([]);
//   const [techNews, setTechNews] = useState(null);
//   const [sportsNews, setSportsNews] = useState(null);
//   const [worldNews, setWorldNews] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/news").then((res) => {
      console.log("Received data: ", res.data);
      setBreakingNews(res.data.articles || []);
    });
  }, []);

  return (
    <>
      <div
        className="row"
        style={{ width: "95vw", margin: "auto", marginTop: "10px" }}
      >
        {breakingNews.map((news, index) => (
          <div key={index} className="col-lg-2 col-md-4 col-6 mb-3 mb-sm-0 mb-lg-2">
            <div className="card">
                <h6>{news.title}</h6>
              <div className="card-body">
                
                {/* <p className="card-text">
                  {news.description}

                </p> */}
                <div>
                    <img src={news.urlToImage} class="card-img-top" alt="Preview image"></img>
                </div>
                <a href="#" className="btn btn-primary">
                  Read
                </a>
              </div>
            </div>
          </div>
        ))}

      </div>

      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default Home;
