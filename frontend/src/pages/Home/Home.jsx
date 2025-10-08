import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import BreakNews from "./BreakNews";
import NewsSections from "./NewsSections";

function Home() {
  let [topNews, setTopNews] = useState([]);
    let [techNews, setTechNews] = useState([]);
    let [sportsNews, setSportsNews] = useState([]);
    let [worldNews, setWorldNews] = useState([]);

  // https://openapi-data-1.onrender.com  Render backend server api

  useEffect(() => {
  const fetchNews = async () => {
    try {
      const [topRes, techRes, sportsRes, worldRes] = await Promise.all([
        axios.get("http://localhost:5000/news/News"),
        axios.get("http://localhost:5000/news/Tech"),
        axios.get("http://localhost:5000/news/Cricket"),
        axios.get("http://localhost:5000/news/World"),
      ]);

      setTopNews(topRes.data.articles || []);
      setTechNews(techRes.data.articles || []);
      setSportsNews(sportsRes.data.articles || []);
      setWorldNews(worldRes.data.articles || []);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  fetchNews();
}, []);


  return (
    <>
      <BreakNews news={topNews} />
      <NewsSections category="Technology" news={techNews} />
      <NewsSections category="Sports" news={sportsNews} />
      <NewsSections category="World" news={worldNews} />
    </>
  );
}

export default Home;
