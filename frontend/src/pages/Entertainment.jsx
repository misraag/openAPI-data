import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import NewsTiles from '../components/NewsTiles';

function Entertainment({darkMode}) {

    let [entertainmentNews, setEntertainmentNews] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios
      .get("http://localhost:5000/news/Entertainment")
      .then((res) => {
        console.log("Received Entertainment News: ", res.data);
        setEntertainmentNews(res.data.articles || []);
      }).finally(() => setLoading(false));
    },[])

    return (
        <NewsTiles loading={loading} category="Entertainment" news={entertainmentNews} darkMode={darkMode}/>
    );
}

export default Entertainment;