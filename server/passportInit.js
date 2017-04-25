const TwitterStrategy = require('passport-twitter').Strategy;

function passportInit(passport) {
  passport.use(new TwitterStrategy({
    consumerKey
  }))
}

module.exports = passportInit;