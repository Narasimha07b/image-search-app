import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import Spinner from './components/Spinner'; // Import Spinner
import './App.css';

// Set axios defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/api/current_user');
        console.log('Current user response:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [location.pathname]);

  if (loading) {
    return <Spinner />; // Use consistent spinner
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={user ? <DashboardPage user={user} setUser={setUser} /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;