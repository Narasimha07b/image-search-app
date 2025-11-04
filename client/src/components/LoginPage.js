import React from 'react';
import './LoginPage.css'; // We will create this CSS file next

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="logo-section">
        <h1 className="app-logo">Image Search App</h1>
      </div>
      <div className="about-section">
        <h2>About Our Application</h2>
        <p>
          Discover and search for images effortlessly with our powerful image search tool.
          Explore a vast collection of images, save your favorite searches, and enjoy a seamless
          browsing experience. Log in to get started and unlock personalized features.
        </p>
      </div>
      <div className="login-section">
        <h2>Log In</h2>
        <p>Please log in to search for images.</p>
        <div className="login-buttons">
          <a href="https://image-search-x84b.onrender.com/auth/google" className="btn google">
            Log in with Google
          </a>
          <a href="https://image-search-x84b.onrender.com/auth/github" className="btn github">
            Log in with GitHub
          </a>
          <a href="https://image-search-x84b.onrender.com/auth/facebook" className="btn facebook">
            Log in with Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
