const express = require('express');
const router = express.Router();
const axios = require('axios');
const { ensureAuth } = require('../middleware/auth');
const Search = require('../models/Search');

// @desc    Search for images and save the search
// @route   POST /api/search
router.post('/search', ensureAuth, async (req, res) => {
  const { term } = req.body;

  if (!term) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  try {
    // Save the search to the database
    await Search.create({
      term,
      userId: req.user._id,
    });

    // Fetch images from Unsplash API
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
      params: {
        query: term,
        per_page: 20,
      },
    });

    // If no results from Unsplash, return mock images as fallback
    if (!response.data.results || response.data.results.length === 0) {
      res.json({
        results: [
          {
            id: 'mock1',
            urls: { small: 'https://via.placeholder.com/400x300?text=Mock+Image+1' },
            alt_description: 'Mock image 1'
          },
          {
            id: 'mock2',
            urls: { small: 'https://via.placeholder.com/400x300?text=Mock+Image+2' },
            alt_description: 'Mock image 2'
          },
          {
            id: 'mock3',
            urls: { small: 'https://via.placeholder.com/400x300?text=Mock+Image+3' },
            alt_description: 'Mock image 3'
          },
          {
            id: 'mock4',
            urls: { small: 'https://via.placeholder.com/400x300?text=Mock+Image+4' },
            alt_description: 'Mock image 4'
          }
        ]
      });
    } else {
      res.json(response.data);
    }
  } catch (error) {
    console.error('Error during image search:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get top 5 most frequent search terms for the current user
// @route   GET /api/top-searches
router.get('/top-searches', ensureAuth, async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$term', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: { _id: 0, term: '$_id' } },
    ]);

    res.json(topSearches.map(item => item.term));
  } catch (error) {
    console.error('Error fetching top searches:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user's search history
// @route   GET /api/history
router.get('/history', ensureAuth, async (req, res) => {
  try {
    const history = await Search.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// @desc    Get current user
// @route   GET /api/current_user
router.get('/current_user', (req, res) => {
  console.log('Current user endpoint called, user:', req.user ? req.user.displayName : 'null');
  res.send(req.user);
});

// @desc    Clear user's search history
// @route   DELETE /api/history
router.delete('/history', ensureAuth, async (req, res) => {
  try {
    await Search.deleteMany({ userId: req.user._id });
    res.status(200).json({ message: 'Search history cleared' });
  } catch (error) {
    console.error('Error clearing search history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
