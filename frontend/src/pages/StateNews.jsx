import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewsTiles from "../components/NewsTiles";

function StateNews({darkMode}) {
  const { stateName } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`https://openapi-data-1.onrender.com/news/${stateName}`)
      .then((res) => {
        setNews(res.data.articles || []);
      })
      .catch((err) => {
        console.error("Error fetching state news:", err);
      })
      .finally(() => setLoading(false));
  }, [stateName]);

  return (
    
        <NewsTiles darkMode={darkMode} news={news} category={stateName} loading={loading}/>
      
  );
}

export default StateNews;
