import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import NewsTiles from '../components/NewsTiles';

function WorldNews() {

    let [worldNews, setWorldNews] = useState([]);

    useEffect(()=> {
        axios
      .get("http://localhost:5000/news/World")
      .then((res) => {
        console.log("Received World News: ", res.data);
        setWorldNews(res.data.articles || []);
      });
    },[])

    return (
        <NewsTiles category="World" news={worldNews}/>
    );
}

export default WorldNews;