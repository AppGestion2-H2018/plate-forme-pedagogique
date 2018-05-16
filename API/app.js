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

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

var app = express();
app.use(cors());

/************************************************** MONGOOSE *********************************************************/
/**
 * l'option de connection inité par l'équipe groupes
 * Danny Dugas, Nicolas Paquet, Andy Chartier, Jean-Sébastien Lemelin
 * @author Jean-Sébastien Lemelin
 * @reference http://mongoosejs.com/docs/guide.html
 * @reference http://mongoosejs.com/docs/connections.html
 */
const options = {
    autoIndex: false, // Ne pas bâtir des index
    keepAlive: 30000, //Durée de la connexion
    socketTimeoutMS: 30000,
    reconnectTries: Number.MAX_VALUE, // N'arrête pas de cesser de se connecter
    reconnectInterval: 500, // Se reconnecte après 500 ms
    poolSize: 10, // Maintient près de 10 connections en parallèle
    // S'il y a une erreur, il renvoi un message aulieu de tenter de se reconnecter
    bufferMaxEntries: 0,
    dbName: 'plate-forme-pedagogique' //Quel nom de base de donnée
};
//Mise en place de la connection de base
mongoose.connect(config.database.uri, options); //On va chercher la CONNECTION STRING dans config.js

// Dire à Mongoose d'utiliser la PROMISE globale
mongoose.Promise = global.Promise;

//Obtenir la connection de base par db
var db = mongoose.connection;

//Lier l'erreur de connection à un message d'erreur
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
