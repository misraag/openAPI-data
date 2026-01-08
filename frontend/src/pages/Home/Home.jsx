import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import NewsSections from "./NewsSections";
import Loading from "../../components/Loading";
import TileList from "../../components/TileList";

function Home({darkMode}) {
  let [topNews, setTopNews] = useState([]);
  let [techNews, setTechNews] = useState([]);
  let [sportsNews, setSportsNews] = useState([]);
  let [worldNews, setWorldNews] = useState([]);
  let [loading, setLoading] = useState(true);

  // https://openapi-data-1.onrender.com  Render backend server api

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [topRes, techRes, sportsRes, worldRes] = await Promise.all([
          axios.get("https://openapi-data-1.onrender.com/news/Headlines"),
          axios.get("https://openapi-data-1.onrender.com/news/Tech"),
          axios.get("https://openapi-data-1.onrender.com/news/Cricket"),
          axios.get("https://openapi-data-1.onrender.com/news/World"),
        ]);

        setTopNews(topRes.data.articles || []);
        setTechNews(techRes.data.articles || []);
        setSportsNews(sportsRes.data.articles || []);
        setWorldNews(worldRes.data.articles || []);
        setLoading(false);
        console.log("top News cached?", topRes.data.cached);
        console.log("tech News cached?", techRes.data.cached);
        console.log("sport News cached?", sportsRes.data.cached);
        console.log("world News cached?", worldRes.data.cached);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      {loading ? (
        <Loading state="Headlines" />
      ) : (
        <div>
          <TileList title="Headlines" news={topNews} limit={12} darkMode={darkMode} />
          <NewsSections darkMode={darkMode} category="Technology" news={techNews} />
          <NewsSections darkMode={darkMode} category="Sports" news={sportsNews} />
          <NewsSections darkMode={darkMode} category="World" news={worldNews} />
        </div>
      )}
    </>
  );
}

export default Home;
