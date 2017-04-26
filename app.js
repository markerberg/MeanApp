var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');

var app = express();
// establish a connection, on each req, to the db. We pass path with name of db
mongoose.connect('localhost:27017/node-angular'); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));// tell express where our views are
app.set('view engine', 'hbs');// what view engine we use

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));// you can access this folder from internet, with static js and css
// end middleware

// middleware for cors, req coming from diff origin other than the server, setup for angular2 app
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/', appRoutes);// any route go through appRoutes

// catch 404, any req that comes back after going through appRoutes, and forward to error handler
app.use(function (req, res, next) {
    return res.render('index'); // for a page refresh, we will go to index
});


module.exports = app;
