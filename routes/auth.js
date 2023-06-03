const router = require('express').Router();

// login
router.get('/login', (req, res) => {
    res.render('login');
});

// logout
router.get('/logout', (req,res) => {
    res.send('logging out');
});

// google auth
router.get('/google', (req, res) => {
    res.send('login with google');
});

module.exports = router;