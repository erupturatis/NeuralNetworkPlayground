require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mysql = require('mysql');
const GitHubStrategy = require('passport-github2').Strategy;
const app = express();

// create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Turbosa341@!',
  // database: 'nodemysql',
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
});

app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('databse created');
  });
});

app.listen('3000', () => {
  console.log('started server');
});
