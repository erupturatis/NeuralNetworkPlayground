require('dotenv').config();
const express = require('express');
const passport = require('passport');
const Auth = require('./Auth/setup');
const { sessionMiddleware } = require('./Auth/setup');
const { isAuth } = require('./Utils/utils');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const recording = require('./routes/recording');
const user = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.listen('3000', () => {
  console.log('started server');
});

app.get('/', (req, res) => {
  //let out = req.user.email;
  res.send(`abcd ${JSON.stringify(req.user)}`);
});

app.use('/auth', auth);
app.use('/recording', recording);
app.use('/user', user);

app.get('/ceva', async (req, res) => {
  res.send('ceva');
});
