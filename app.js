require('dotenv').config;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const initRouter = require('./routes/init');
const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');
const brandRouter = require('./routes/brands');
const productRouter = require('./routes/products');
const searchRouter = require('./routes/search');
const ordersRouter = require('./routes/orders');
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/users');
const membershipRouter = require('./routes/membership');

var db = require("./models");
db.sequelize.sync({ force : false });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/init', initRouter )
app.use('/auth', authRouter);
app.use('/categories', categoriesRouter);
app.use('/brands', brandRouter);
app.use('/products', productRouter);  
app.use('/search', searchRouter);
app.use('/orders', ordersRouter);
app.use('/cart', cartRouter);
app.use('/users', userRouter);
app.use('/memberships', membershipRouter);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
  
module.exports = app;
