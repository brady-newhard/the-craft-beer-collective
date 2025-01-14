const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Index
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
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

// Show (Brewery Details)
router.get('/:userId/breweries/:breweryId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const brewery = user.brewery.id(req.params.breweryId);
      res.render('breweries/show.ejs', { user, brewery });
    } catch (error) {
      console.error('Error fetching brewery details:', error);
      res.redirect('/');
    }
});

module.exports = router;