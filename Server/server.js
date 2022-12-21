require('dotenv').config();
const express = require('express');
const passport = require('passport');
const Auth = require('./Auth/setup');
const { sessionMiddleware } = require('./Auth/setup');
const { isAuth } = require('./Utils/utils');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const network = require('./routes/network');
const user = require('./routes/user');
var cors = require('cors');
const { apiErrorHandler } = require('./error/error_handler');
const app = express();

app.use(bodyParser.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://127.0.0.1:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  //let out = req.user.email;
  res.send(`abcd ${JSON.stringify(req.user)}`);
});

app.use('/auth', auth);
app.use('/network', network);
app.use('/user', user);

app.use(apiErrorHandler);

app.listen('3000', () => {
  console.log('started server');
});
