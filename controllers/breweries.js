const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Fetch Data
router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        res.render('breweries/index.ejs', { user });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
  
// New Item Page
router.get('/new', (req, res) => {
    res.render('breweries/new.ejs');
});

module.exports = router;