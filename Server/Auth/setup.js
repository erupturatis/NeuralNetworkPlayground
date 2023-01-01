const passport = require('passport');
const User = require('../models/User');
const mongoose = require('mongoose');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
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
  // we need to only serialize the databse userID of the user
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  // fetch from databse the userData that we need based on the serialized ID
  User.findById(obj.userID, (err, user) => {
    // console.log('deserialzing');
    done(null, user);
  });
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      // here I should save database ID/ identifier for the user
      let identifier =
        profile.emails !== undefined ? profile.emails[0].value : profile.id;
      let users = await User.find({
        email: identifier,
        authType: 'github',
      });
      if (users.length > 0) {
        item = users[0];
        return done(null, { userID: item.id });
      }

      let newUser = await User.create({
        email: identifier,
        username: profile.username,
        authType: 'github',
      });
      return done(null, { userID: newUser.id });
    }
  )
);

// console.log(process.env.GOOGLE_CLIENT_ID);
// console.log(process.env.GOOGLE_CLIENT_SECRET);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      // here I should save database ID/ identifier for the user

      let flow = async function () {
        // console.log(profile);
        let users = await User.find({
          email: profile.email,
          authType: 'google',
        });
        if (users.length > 0) {
          item = users[0];
          console.log(item.id);
          return done(null, { userID: item.id });
        }

        let newUser = await User.create({
          email: profile.email,
          username: profile.displayName,
          authType: 'google',
        });
        return done(null, { userID: newUser.id });
      };

      flow().then(() => {
        console.log('finished auth with google');
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
