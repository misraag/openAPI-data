import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import NewsTiles from '../components/NewsTiles';

function Entertainment() {

    let [entertainmentNews, setEntertainmentNews] = useState([]);

    useEffect(()=> {
        axios
      .get("http://localhost:5000/news/Entertainment")
      .then((res) => {
        console.log("Received Entertainment News: ", res.data);
        setEntertainmentNews(res.data.articles || []);
      });
    },[])

    return (
        <NewsTiles category="Entertainment" news={entertainmentNews}/>
    );
}

export default Entertainment;