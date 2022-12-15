require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');
const Recording = require('./model/Recording');
const User = require('./model/User');

let uri = process.env.MONGO_URI.replace(
  '<password>',
  process.env.MONGO_PASSWORD
);

mongoose.set('strictQuery', true);
mongoose.connect(uri, () => {
  console.log('conencted to mongo');
});

const app = express();

let sessionStore = new MongoDBStore({
  uri,
  collection: 'MySessions',
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log('serialized');
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

      User.find(
        {
          email: profile.emails[0].value,
        },
        (err, items) => {
          if (items.length > 0) {
            item = items[0];

            console.log('found item', item);

            return done(null, { userEmail: item.email });
          } else {
            console.log('got in second if');

            let newUser = User.create({
              email: profile.emails[0].value,
              username: profile.username,
            });

            return done(null, { userEmail: newUser.email });
          }
        }
      );
    }
  )
);
let isAuth = (req, res, next) => {
  console.log(req.session.passport.user);
  if (req.session.passport.user) {
    console.log('is auth');
    next();
  } else {
    res.redirect('/');
  }
};

app.listen('3000', () => {
  console.log('started server');
});

app.get('/', (req, res) => {
  res.send('abcd');
});

app.get('/test', isAuth, (req, res) => {
  res.send('test');
});

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  }
);
