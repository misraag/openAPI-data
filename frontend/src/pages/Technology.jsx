import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import NewsTiles from '../components/NewsTiles';

function Technology() {

    let [techNews, setTechNews] = useState([]);

    useEffect(()=> {
        axios
      .get("http://localhost:5000/news/Technology")
      .then((res) => {
        console.log("Received Technology News: ", res.data);
        setTechNews(res.data.articles || []);
      });
    },[])

    return (
        <NewsTiles category="Tech" news={techNews}/>
    );
}

export default Technology;