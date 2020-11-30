const BearerStrategy = require("passport-http-bearer").Strategy;
const UserToken = require("../models").user_token;
//import UserToken from '../models/usertoken';
const passport = require("passport");
passport.use(
  new BearerStrategy(function(token, done) {
    UserToken.findOne({ where: { token: token }, include: "user" })
      .then(userToken => {
        if (!userToken) return done(null, false);
        if (!userToken.user) return done(null, false);
        return done(null, userToken.user, { scope: "all" });
      })
      .catch(err => {
        return done(err);
      });
  })
);

module.exports = passport;
