const express = require('express');
const router = express.Router();
const passport = require('passport');
const CLIENT_URL = 'http://localhost:5173/Playground';
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect(CLIENT_URL);
  }
);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect(CLIENT_URL);
  }
);

module.exports = router;
