const express = require('express');
const router = express.Router();
const passport = require('passport');
const REDIRECT_URL = `${process.env.CLIENT_URL}/Playground`;

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect(REDIRECT_URL);
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
    res.redirect(REDIRECT_URL);
  }
);

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successfull',
      user: req.user,
    });
  } else {
    res.status(201).json({
      success: false,
    });
  }
});

module.exports = router;
