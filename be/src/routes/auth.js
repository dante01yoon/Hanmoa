const router = require('express').Router();
const passport = require('passport'); 

//auth login
router.get('/login', (req,res) => {
  res.render('login');
}); 

//create
router.get('/create', (req, res) => {
  res.render('create');
});

//auth logout
router.get('/logout', (req,res) => {
  res.send('logging out');
})

router.get('/google', passport.authenticate(passport, {
  scope: ['profile',]
}),);

module.exports = router; 