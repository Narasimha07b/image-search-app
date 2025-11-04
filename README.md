MERN Image Search and Multi-Select Application

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application implementing OAuth authentication and Unsplash API integration. It allows users to authenticate via Google, GitHub, or Facebook, search for images, view personal search history, and explore the most popular search terms across all users.

Live Deployment

Frontend: https://your-frontend-url.onrender.com

Backend API: https://image-search-x84b.onrender.com

Project Overview

Core Functionalities

Secure OAuth authentication (Google, GitHub, Facebook)

Search images via the Unsplash API

Display images in a 4-column grid with multi-select capability

Track and count selected images dynamically

Store search history per user

Display top 5 most frequent searches across all users

Responsive user interface built with React

Project Structure
image-search-app-main/
│
├── server/                    # Express backend
│   ├── server.js
│   ├── config/
│   │   └── passport.js
│   ├── models/
│   │   ├── User.js
│   │   └── Search.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── searchRoutes.js
│   │   ├── historyRoutes.js
│   │   └── topSearchRoutes.js
│   └── .env.example
│
├── client/                    # React frontend
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   ├── styles.css
│   └── .env
│
└── README.md

Environment Configuration
Backend (server/.env)
PORT=5000
MONGO_URI=your_mongodb_connection_uri
SESSION_SECRET=your_secret
UNSPLASH_ACCESS_KEY=your_unsplash_api_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

FRONTEND_URL=https://your-frontend-url.onrender.com

Frontend (client/.env)
REACT_APP_API_BASE_URL=https://image-search-x84b.onrender.com

API Endpoints
Method	Endpoint	Description
GET	/api/top-searches	Retrieve top 5 most frequent search terms
POST	/api/search	Search images on Unsplash and store user query
GET	/api/history	Retrieve the user's past search history
GET	/auth/google, /auth/github, /auth/facebook	Initiate OAuth login
GET	/auth/me	Fetch current logged-in user
GET	/auth/logout	Log out the authenticated user
Local Setup

Clone the Repository

git clone https://github.com/Narasimha07b/image-search-app.git
cd image-search-app-main


Backend Setup

cd server
npm install
npm start


The backend will run on http://localhost:5000

Frontend Setup

cd ../client
npm install
npm start


The frontend will run on http://localhost:3000

Deployment Guide (Render)
Backend Configuration

Build Command: npm install

Start Command: node server.js

Publish Directory: Not required (API-only service)

Environment Variables: as shown in .env

Frontend Configuration

Build Command: npm install && npm run build

Publish Directory: build

Environment Variable:
REACT_APP_API_BASE_URL=https://image-search-x84b.onrender.com

Tech Stack

Frontend: React.js, Axios

Backend: Node.js, Express.js, Passport.js

Database: MongoDB Atlas

API Integration: Unsplash API

Deployment: Render

Author

B. Laxmi Narasimha
GitHub: @Narasimha07b
