const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon =require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const dotenv=require('dotenv');
dotenv.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

const db = require('./helpers/db.js')();
//app.use(db);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', auth);

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
