var app = require('./express');
var express = app.express;

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(cookieParser());
app.use(session({
    //process.env.SESSION_SECRET instead of hardcoding
    secret: 'asdasfwafdawfe',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

//require("./test/app");
require("./assignment/app");

port = process.env.PORT || 3000;
app.listen(port);