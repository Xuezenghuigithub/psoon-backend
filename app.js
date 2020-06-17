const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// 连接数据库
require('./utils/db');

const userRouter = require('./routes/user');
const imgRouter = require('./routes/img');
const otherRouter = require('./routes/other');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const options = {
  setHeaders: function (res, path, stat) { // 静态资源可跨域
    res.set('Access-Control-Allow-Origin', '*')
  }
}
app.use(express.static(path.join(__dirname, 'public'), options));

app.use('/', userRouter);
app.use('/img', imgRouter);
app.use('/other', otherRouter);

//----------------------------cors 设置---------------------------------------
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', "true");
  next();
});
app.use((req, res, next) => {
  if (req.method && req.method.toLowerCase() === 'options') {
    return res.send(true);
  }
  next();
});

// catch 404 and forward to error handler
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
