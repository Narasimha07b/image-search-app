const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with Google
// @route   GET /google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc    Google auth callback
// @route   GET /google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }),
  (req, res) => {
    console.log('Google OAuth callback - User:', req.user ? req.user.displayName : 'null');
    // Successful authentication, redirect to dashboard.
    res.redirect('http://localhost:3000/dashboard');
  }
);

// @desc    Auth with GitHub
// @route   GET /github
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// @desc    GitHub auth callback
// @route   GET /github/callback
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: 'http://localhost:3000' }),
  (req, res) => {
    // Successful authentication, redirect to dashboard.
    res.redirect('http://localhost:3000/dashboard');
  }
);

// @desc    Logout user
// @route   GET /logout
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.status(200).send('OK');
    });
  });
});

module.exports = router;
