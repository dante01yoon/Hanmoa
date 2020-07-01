require('dotenv');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy({
    //options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }), () => {
    //passport callback function
  }
)

module.exports = passport; 