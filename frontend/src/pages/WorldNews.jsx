import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import NewsTiles from '../components/NewsTiles';

function WorldNews({darkMode}) {

    let [worldNews, setWorldNews] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios
      .get("http://localhost:5000/news/World")
      .then((res) => {
        console.log("Received World News: ", res.data);
        setWorldNews(res.data.articles || []);
      }).finally(() => setLoading(false));
    },[])

    return (
        <NewsTiles darkMode={darkMode} loading={loading} category="World" news={worldNews}/>
    );
}

export default WorldNews;