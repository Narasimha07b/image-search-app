import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchHistory.css';

const SearchHistory = ({ onSearch }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('https://image-search-x84b.onrender.com/api/history', {
          withCredentials: true, // Important for sending the session cookie
        });
        setHistory(res.data);
      } catch (err) {
        console.error('Error fetching search history:', err);
      }
    };
    fetchHistory();
  }, []);

  const clearHistory = async () => {
    try {
      await axios.delete('https://image-search-x84b.onrender.com/api/history', {
        withCredentials: true,
      });
      setHistory([]);
    } catch (err) {
      console.error('Error clearing search history:', err);
    }
  };

  return (
    <div className="history-container">
      <h3>Your Search History</h3>
      <button onClick={clearHistory}>Clear History</button>
      <ul>
        {history.map((item) => (
          <li key={item._id} onClick={() => onSearch(item.term)}>
            <span>{item.term}</span>
            <span>{new Date(item.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
