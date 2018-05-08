var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var config = require('./config');
var indexRouter = require('./routes/index');
var bibliothequeRouter = require('./routes/API/bibliotheque/bibliotheque');
var evenementsRouter = require('./routes/API/evenements/evenements');
var groupesRouter = require('./routes/API/groupes/groupes');
var publicationsRouter = require('./routes/API/publications/publications');

var auth = require('./routes/API/utilisateurs/auth');
var resultatsRouter = require('./routes/API/resultats/resultats');
var utlisateursRouter = require('./routes/API/utilisateurs/utilisateurs');

var app = express();
app.use(cors());

/************************************************** MONGOOSE *********************************************************/
const options = {
    autoIndex: false, // Don't build indexes
    keepAlive: 30000,
    socketTimeoutMS: 30000,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    dbName: 'plate-forme-pedagogique' //Quel nom de base de donnée
};
//Set up default mongoose connection
mongoose.connect(config.database.uri, options); //Connection string commune

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*********************************************** FIN MONGOOSE ********************************************************/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/utilisateurs', utlisateursRouter);


/**
 * Permet d'intercepter toutes les requêtes et de faire du préprocessing avant qu'on laisse la requête continuer.
 */
app.use(function (req, res, next) {
    // Mettre du preprocessing ici
    const fal = true;
    if (fal) {
        GestionCompleteDesCookiesEtDesDonneesDeConnexion(req, res).then(function (multiReponse) {
            res = multiReponse[0];

            if (multiReponse[1]) {
                // Permet de continuer la requête.
                next();
            } else {
                // Accès refusé, empêcher l'obtentions des données!
                res.send();
                //next();
            }

        });
    } else {
        next();
    }
});

app.use('/', indexRouter);
app.use('/api/bibliotheque', bibliothequeRouter);
app.use('/api/evenements', evenementsRouter);
app.use('/api/groupes', groupesRouter);
app.use('/api/publications', publicationsRouter);
app.use('/api/resultats', resultatsRouter);

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
