import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import NewsTiles from '../components/NewsTiles';

function Sports({darkMode}) {

    let [sportsNews, setSportsNews] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios
      .get("http://localhost:5000/news/Cricket")
      .then((res) => {
        console.log("Received Sports News: ", res.data);
        setSportsNews(res.data.articles || []);
      }).finally(() => setLoading(false));
    },[])

    return (
        <NewsTiles darkMode={darkMode} loading={loading} category="Sports" news={sportsNews}/>
    );
}

export default Sports;