const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Index
router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        res.render('breweries/index.ejs', { user, breweries: user.brewery });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
  
// New
router.get('/new', (req, res) => {
    res.render('breweries/new.ejs');
});

// POST/Create
router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        user.brewery.push(req.body);
        await user.save();
        res.redirect(`/users/${req.session.user._id}/breweries`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// Show
router.get('/:breweryId', async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id);
      const brewery = user.brewery.id(req.params.breweryId);
      res.render('breweries/show.ejs', { brewery, user });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

module.exports = router;