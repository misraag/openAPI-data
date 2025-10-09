import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import NewsTiles from '../components/NewsTiles';

function Politics() {

    let [politicsNews, setPoliticsNews] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios
      .get("http://localhost:5000/news/Politics")
      .then((res) => {
        console.log("Received Politics News: ", res.data);
        setPoliticsNews(res.data.articles || []);
      }).finally(() => setLoading(false));
    },[])

    return (
        <NewsTiles loading={loading} category="Politics" news={politicsNews}/>
    );
}

export default Politics;