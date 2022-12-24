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

app.use(bodyParser.json({ limit: '50mb' }));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
  })
);

app.use('/auth', auth);
app.use('/network', network);
app.use('/user', user);

app.use(apiErrorHandler);

app.listen('3000', () => {
  console.log('started server');
});
