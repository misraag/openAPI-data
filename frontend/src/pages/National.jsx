import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import NewsTiles from '../components/NewsTiles';

function National() {

    let [nationalNews, setNationalNews] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios
      .get("http://localhost:5000/news/India")
      .then((res) => {
        console.log("Received National News: ", res.data);
        setNationalNews(res.data.articles || []);
      }).finally(() => setLoading(false));
    },[])

    return (
        <NewsTiles loading={loading} category="National" news={nationalNews}/>
    );
}

export default National;