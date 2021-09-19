const router = require('express').Router();
const { Category, Plant, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/api/categories');
      res.json({ message: 'loggedin' });
      return;
    } else {
      res.render('homepage');
    }
  } catch {}
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    res.json({ message: 'loggedin' });
    return;
  }

  res.render('login');
});

router.get('/location', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/api/locations');
    res.json({ message: 'loggedin' });
    return;
  }
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    res.json({ message: 'loggedin' });
    return;
  }

  res.render('signup');
});

module.exports = router;
