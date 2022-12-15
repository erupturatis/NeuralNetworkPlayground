require('dotenv').config();
const express = require('express');
const passport = require('passport');
// const { MongoClient } = require('mongodb');
const Recording = require('./models/Recording');
const User = require('./models/User');
const Auth = require('./Auth/setup');
const { sessionMiddleware } = require('./Auth/setup');
const { isAuth } = require('./Utils/utils');

const auth = require('./routes/auth');
const recording = require('./routes/recording');

const app = express();

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.listen('3000', () => {
  console.log('started server');
});

app.get('/', (req, res) => {
  res.send(`abcd`);
});

app.use('/auth', auth);
app.use('/recording', recording);
