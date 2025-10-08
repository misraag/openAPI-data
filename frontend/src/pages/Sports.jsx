import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import NewsTiles from '../components/NewsTiles';

function Sports() {

    let [sportsNews, setSportsNews] = useState([]);

    useEffect(()=> {
        axios
      .get("http://localhost:5000/news/Cricket")
      .then((res) => {
        console.log("Received Sports News: ", res.data);
        setSportsNews(res.data.articles || []);
      });
    },[])

    return (
        <NewsTiles category="Sports" news={sportsNews}/>
    );
}

export default Sports;