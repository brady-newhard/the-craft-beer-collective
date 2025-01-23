const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Index
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('users/index.ejs', { users });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// Show (users)
router.get('/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.render('users/show.ejs', { user });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  // Index
  router.get('/:userId/breweries', async (req, res) => {
  try {
      const user = await User.findById(req.session.user._id);
      res.render('breweries/index.ejs', { user, breweries: user.brewery });
  } catch (error) {
      console.log(error);
      res.redirect('/');
  }
});

// New
router.get('/:userId/breweries/new', (req, res) => {
  res.render('breweries/new.ejs');
});

// POST/Create
router.post('/:userId/breweries/', async (req, res) => {
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
router.get('/:userId/breweries/:breweryId', async (req, res) => {
  try {
    const { userId, breweryId } = req.params;
    const currentUserId = req.session.user ? req.session.user._id : null;
    const user = await User.findById(userId);
    const brewery = user.brewery.id(breweryId);
    res.render('breweries/show.ejs', { brewery, userId, currentUserId, user: req.session.user || null});
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Edit
router.get('/:userId/breweries/:breweryId/edit', async (req, res) => {
  try { 
      const user = await User.findById(req.session.user._id);
      const brewery = user.brewery.id(req.params.breweryId);
      res.render('breweries/edit.ejs', { brewery, user });
  } catch (error) {
      console.log(error);
      res.redirect('/');
  }
});

// Delete
router.delete('/:userId/breweries/:breweryId', async (req, res) => {
  try {
      const user = await User.findById(req.session.user._id);
      user.brewery = user.brewery.filter((item) => item._id.toString() !== req.params.breweryId);
      await user.save();
      res.redirect(`/users/${req.session.user._id}/breweries`);
  } catch (error) {
      console.log(error);
      res.redirect('/');
  }
});

// Update
router.put('/:userId/breweries/:breweryId', async (req, res) => {
  try {
      const user = await User.findById(req.session.user._id);
      const brewery = user.brewery.id(req.params.breweryId);
      brewery.set(req.body);
      await user.save();
      res.redirect(`/users/${req.session.user._id}/breweries`);
  } catch (error) {
      console.log(error);
      res.redirect('/');
  }
});

module.exports = router;