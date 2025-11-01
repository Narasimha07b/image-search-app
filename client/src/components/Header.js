import React from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => (
  <header className="app-header">
    <div className="header-content">
      <h1 className="app-title">Image Search App</h1>
      <span className="welcome-message">Welcome, {user.displayName}!</span>
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
    </div>
  </header>
);

export default Header;
