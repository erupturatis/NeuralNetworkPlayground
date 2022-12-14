require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();

let uri = process.env.MONGO_URI.replace(
  '<password>',
  process.env.MONGO_PASSWORD
);

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
  done(null, obj);
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
      //console.log(profile);
      findUser(profile.emails[0].value, (result) => {
        console.log('returned in callback done');
        console.log(result);
        if (result.length > 0) {
          console.log('got in first if');
          console.log(result[0].userID);
          return done(null, { userID: result[0].userID });
        } else {
          console.log('got in second if');
          addUser(uuidv4(), profile.emails[0].value, profile.username, '');
          return done(null, { userID: result[0].userID });
        }
      });
      console.log('does it get here?');
    }
  )
);

app.listen('3000', () => {
  console.log('started server');
});

app.get('/', (req, res) => {
  res.send('abcd');
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
