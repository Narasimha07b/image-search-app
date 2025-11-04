import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopSearchesBanner.css';

const TopSearchesBanner = ({ onSearch }) => {
  const [topSearches, setTopSearches] = useState([]);

  useEffect(() => {
    const fetchTopSearches = async () => {
      try {
        const res = await axios.get('https://image-search-x84b.onrender.com/api/top-searches');
        setTopSearches(res.data);
      } catch (err) {
        console.error('Error fetching top searches:', err);
      }
    };
    fetchTopSearches();
  }, []);

  return (
    <div className="top-searches-banner">
      <span>Top Searches:</span>
      {topSearches.map((term, index) => (
        <span key={index} className="search-term" onClick={() => onSearch(term)}>
          {term}
        </span>
      ))}
    </div>
  );
};

export default TopSearchesBanner;
