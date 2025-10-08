import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import BreakNews from "./BreakNews";
import NewsSections from "./NewsSections";

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
      <BreakNews news={breakingNews}/>
      <NewsSections news={breakingNews}/>

      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default Home;
