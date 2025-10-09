import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import NewsTiles from '../components/NewsTiles';

function Technology({darkMode}) {

    let [techNews, setTechNews] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios
      .get("http://localhost:5000/news/Technology")
      .then((res) => {
        console.log("Received Technology News: ", res.data);
        setTechNews(res.data.articles || []);
      }).finally(() => setLoading(false));
    },[])

    return (
        <NewsTiles darkMode={darkMode} loading={loading} category="Tech" news={techNews}/>
    );
}

export default Technology;