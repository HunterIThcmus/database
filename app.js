var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://luanpham:01667376890@cluster0-toeuz.gcp.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});
var db=mongoose.connection;
var indexRouter = require('./routes/index');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);

//create schame
var topschema = new mongoose.Schema({
    top: String,
    name: String,
    id: String,
    quanty: String,
    sum: String
},
 {
    collection:'top10'

 });

// load data
const listtop10 = db.useDb("mydb").model("listtop10",topschema);
app.get('/top10', function (req, res) {   
  listtop10.find({}, function (err, value) {
      if (err) {
          console.log(err);
      } else {
          res.render('top10', { list: value })
      }
  })
})

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
