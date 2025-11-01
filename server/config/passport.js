const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User'); // Path to your User model

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback', // This URL must be authorized in your Google Cloud project
      },
      async (accessToken, refreshToken, profile, done) => {
        // This function is called after successful authentication with Google
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
        };

        try {
          // Check if user already exists in your database
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            console.log('Existing user found:', user.displayName);
            // If user exists, pass the user object to the next step
            done(null, user);
          } else {
            // If user doesn't exist, create a new user in your database
            user = await User.create(newUser);
            console.log('New user created:', user.displayName);
            done(null, user);
          }
        } catch (err) {
          console.error('Passport strategy error:', err);
          done(err, null);
        }
      }
    )
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          githubId: profile.id,
          displayName: profile.displayName,
        };

        try {
          let user = await User.findOne({ githubId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error('Passport strategy error:', err);
          done(err, null);
        }
      }
    )
  );

  // These functions are used by Passport to store/retrieve user data from the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
        done(err, null);
    }
  });
};