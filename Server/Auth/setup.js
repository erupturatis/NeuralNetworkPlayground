const passport = require('passport');
const User = require('../models/User');
const mongoose = require('mongoose');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
require('dotenv').config();
const MongoDBStore = require('connect-mongodb-session')(session);

let uri = process.env.MONGO_URI.replace(
  '<password>',
  process.env.MONGO_PASSWORD
);

mongoose.set('strictQuery', true);
mongoose.connect(uri, () => {
  console.log('conencted to mongo');
});

passport.serializeUser(function (user, done) {
  console.log('serialized');
  console.log(user);
  // we need to only serialize the databse userID of the user
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  // fetch from databse the userData that we need based on the serialized ID
  User.findOne(obj, (err, user) => {
    done(null, user);
  });
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // here I should save database ID/ identifier for the user

      let flow = async function () {
        let users = await User.find({
          email: profile.emails[0].value,
        });
        if (users.length > 0) {
          item = users[0];
          return done(null, { userEmail: item.email });
        }

        let newUser = await User.create({
          email: profile.emails[0].value,
          username: profile.username,
        });
        return done(null, { userEmail: newUser.email });
      };

      flow().then(() => {
        console.log('finished auth with github');
      });
    }
  )
);

const sessionStore = new MongoDBStore({
  uri,
  collection: 'MySessions',
});

const sessionMiddleware = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  },
});

exports.sessionMiddleware = sessionMiddleware;
