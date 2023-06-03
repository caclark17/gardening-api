const router = require('express').Router();

// login
router.get('/login', (req, res) => {
    res.render('login');
});

// google auth
router.get('/google', (req, res) => {
    res.send('login with google');
});