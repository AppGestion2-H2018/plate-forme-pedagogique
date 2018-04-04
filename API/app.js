var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var bibliothequeRouter = require('./routes/API/bibliotheque/bibliotheque');
var evenementsRouter = require('./routes/API/evenements/evenements');
var groupesRouter = require('./routes/API/groupes/groupes');
var publicationsRouter = require('./routes/API/publications/publications');
var resultatsScolairesRouter = require('./routes/API/resultats-scolaires/resultats-scolaires');
var utlisateursRouter = require('./routes/API/utilisateurs/utilisateurs')

var app = express();
app.use(cors());
mongoose.connect('mongodb://localhost:27017/plate-forme-pedagogique'); //Connection string locale pour le moment

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/bibliotheque', bibliothequeRouter);
app.use('/api/evenements', evenementsRouter);
app.use('/api/groupes', groupesRouter);
app.use('/api/publications', publicationsRouter);
app.use('/api/resultats-scolaires', resultatsScolairesRouter);
app.use('/api/utilisateurs', utlisateursRouter);

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
