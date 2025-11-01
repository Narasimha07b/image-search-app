const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: 'c:\\Bablu\\image-search-app\\server\\.env' });

// Passport config (we will create this file next)
require('./config/passport')(passport);

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());


app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback_secret', // Use the secret from your .env file
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
// A simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
