const createError = require('http-errors');
const express = require('express');
const session = require("express-session");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require("./middlewares/passport");
const indexRouter = require('./routes/index');
const authRouter = require('./components/auth/authRouter');
const userRouter = require('./components/user/userRouter');
const shopRouter = require('./components/product/productRouter');
const contactRouter = require('./components/contact/contactRouter');
const cartRouter = require('./components/cart/cartRouter');
const checkRouter = require('./components/check/checkRouter')

const db = require('./config/database.config');
db.connect();

const app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, "components")]);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

app.use(function (req, res, next) {
  res.locals.user = req.user || req.session.user;
  // res.locals.message = req.session.message;
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/product', shopRouter);
app.use('/contact', contactRouter);
app.use('/cart', cartRouter);
app.use('/check', checkRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
