import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NewsTiles from "../components/NewsTiles";

function CategoryNews({ darkMode }) {
  const { category } = useParams();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`https://openapi-data-1.onrender.com/news/${category}`)
      .then((res) => {
        setNews(res.data.articles || []);
        console.log(`${category} News cached`, res.data.cached);

      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <NewsTiles
      darkMode={darkMode}
      loading={loading}
      category={category}
      news={news}
    />
  );
}

export default CategoryNews;
